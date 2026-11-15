// Adversarial access test for household sharing (stage 6 + auth stages 1-5).
// Creates three REAL test users through the Supabase Admin API (service key
// from the Management API), exercises the policies as each user and as anon,
// dry-runs the operator migration + rollback on a SYNTHETIC legacy row, then
// cleans up everything it created. Run only after docs/auth-stage6.sql.
//
//   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/test-household-rls.mjs
//
// No secrets are printed; test-user credentials live only in this process.
// Nothing touches existing rows: the only meal_state write is a new synthetic
// id that is deleted again in this run.
const REF = process.env.PROJECT_REF || 'ggqfapcmxxhlgntmejgy';
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
if (!TOKEN) { console.error('Set SUPABASE_ACCESS_TOKEN'); process.exit(2); }
const SUPA_URL = `https://${REF}.supabase.co`;
const MGMT = 'https://api.supabase.com/v1';
const PUB = 'sb_publishable_1ORW_K2uTBuc72s_O7kFdg_Exdbddvu';

let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : ' — ' + detail}`);
  if (!ok) failures++;
};

async function mgmt(path, method = 'GET', body) {
  const r = await fetch(`${MGMT}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`Management API ${method} ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}
const sql = (query) => mgmt(`/projects/${REF}/database/query`, 'POST', { query });

async function admin(path, key, method = 'GET', body) {
  const r = await fetch(`${SUPA_URL}/auth/v1${path}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok && method !== 'DELETE') throw new Error(`Admin API ${method} ${path}: ${r.status} ${await r.text()}`);
  return method === 'DELETE' ? null : r.json();
}

async function db(key, path, { method = 'GET', body, prefer } = {}) {
  const r = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: PUB, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch { json = text; }
  return { status: r.status, data: json };
}

const stamp = Date.now().toString(36);
const mk = (n) => `rls-test-${n}-${stamp}@example.invalid`;
const password = crypto.randomUUID() + crypto.randomUUID();
const users = {}; // name -> {id, jwt}
let secret;

async function makeUser(name) {
  const email = mk(name);
  const u = await admin('/admin/users', secret, 'POST', { email, password, email_confirm: true });
  const r = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: PUB, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`password grant failed for ${email}: ${r.status}`);
  users[name] = { id: u.id, jwt: j.access_token, email };
}

async function makeHousehold(name) {
  const jwt = users[name].jwt;
  const h = await db(jwt, 'households', { method: 'POST', body: {}, prefer: 'return=representation' });
  if (h.status >= 300) throw new Error(`${name} household insert: ${h.status} ${JSON.stringify(h.data)}`);
  const hid = h.data[0].id;
  const m = await db(jwt, 'household_members', {
    method: 'POST', body: { household_id: hid, user_id: users[name].id, role: 'owner' }, prefer: 'return=minimal',
  });
  if (m.status >= 300) throw new Error(`${name} membership insert: ${m.status} ${JSON.stringify(m.data)}`);
  return hid;
}

const householdIds = [];
const syntheticCode = `rls-test-${stamp}`;

try {
  // 1. Service key from the Management API (never printed).
  const keys = await mgmt(`/projects/${REF}/api-keys?reveal=true`);
  secret = (keys || []).find((k) => k.type === 'service_role' || k.api_key?.startsWith('sb_secret'))?.api_key;
  if (!secret) throw new Error('No service/secret API key available via Management API');

  await makeUser('a');
  await makeUser('b');
  await makeUser('c');

  // 2. Two households, seeded by their owners through the real policies.
  const hA = await makeHousehold('a'); householdIds.push(hA);
  const hB = await makeHousehold('b'); householdIds.push(hB);
  const seedA = await db(users.a.jwt, 'household_state', { method: 'POST', body: { household_id: hA, data: { marker: 'A' } }, prefer: 'return=minimal' });
  check('A seeds own household state', seedA.status < 300, JSON.stringify(seedA.data));
  const seedB = await db(users.b.jwt, 'household_state', { method: 'POST', body: { household_id: hB, data: { marker: 'B' } }, prefer: 'return=minimal' });
  check('B seeds own household state', seedB.status < 300, JSON.stringify(seedB.data));

  // 3. Cross-household isolation.
  const aRead = await db(users.a.jwt, `household_state?select=household_id,data`);
  check('A reads only own household', aRead.status === 200 && aRead.data.length === 1 && aRead.data[0].household_id === hA, JSON.stringify(aRead.data));
  const aReadB = await db(users.a.jwt, `household_state?household_id=eq.${hB}&select=household_id`);
  check('A reading B by id gets zero rows', aReadB.status === 200 && aReadB.data.length === 0, `status ${aReadB.status}`);
  const aUpdB = await db(users.a.jwt, `household_state?household_id=eq.${hB}`, { method: 'PATCH', body: { data: { marker: 'hijack' } }, prefer: 'return=representation' });
  check('A cannot update B', aUpdB.status >= 400 || (Array.isArray(aUpdB.data) && aUpdB.data.length === 0), `status ${aUpdB.status}`);
  const aInsB = await db(users.a.jwt, 'household_state', { method: 'POST', body: { household_id: hB, data: { marker: 'hijack' } }, prefer: 'return=representation' });
  check('A cannot insert into B', aInsB.status >= 400, `status ${aInsB.status}`);
  const aDelOwn = await db(users.a.jwt, `household_state?household_id=eq.${hA}`, { method: 'DELETE', prefer: 'return=representation' });
  check('no client delete on household_state', aDelOwn.status >= 400 || (Array.isArray(aDelOwn.data) && aDelOwn.data.length === 0), `status ${aDelOwn.status}`);
  const anon = await db(PUB, 'household_state?select=household_id');
  check('anon reads zero rows', anon.status === 200 && anon.data.length === 0, `status ${anon.status}`);
  const anonIns = await db(PUB, 'household_state', { method: 'POST', body: { household_id: hA, data: {} }, prefer: 'return=minimal' });
  check('anon cannot insert', anonIns.status >= 400, `status ${anonIns.status}`);
  const bakA = await db(users.a.jwt, 'legacy_state_backup?select=id');
  check('backup table refuses authenticated read', bakA.status >= 400 || bakA.data?.length === 0, `status ${bakA.status}`);
  const bakAnon = await db(PUB, 'legacy_state_backup?select=id');
  check('backup table refuses anon read', bakAnon.status >= 400 || bakAnon.data?.length === 0, `status ${bakAnon.status}`);

  // 4. Invite flow: A invites C. Misuse first, then happy path, then removal.
  const inv = await db(users.a.jwt, 'household_invites', {
    method: 'POST',
    body: { household_id: hA, invited_email: users.c.email, invited_by: users.a.id, invited_by_name: 'Test A' },
    prefer: 'return=representation',
  });
  check('A invites C by email', inv.status < 300, JSON.stringify(inv.data));
  const inviteId = inv.data?.[0]?.id;

  const bSeesInvite = await db(users.b.jwt, `household_invites?id=eq.${inviteId}&select=id`);
  check('B cannot see invite addressed to C', bSeesInvite.status === 200 && bSeesInvite.data.length === 0, `status ${bSeesInvite.status}`);
  const bAccept = await db(users.b.jwt, 'rpc/accept_household_invite', { method: 'POST', body: { invite_id: inviteId } });
  check('B cannot accept invite addressed to C', bAccept.status >= 400, `status ${bAccept.status}`);

  const cAccept = await db(users.c.jwt, 'rpc/accept_household_invite', { method: 'POST', body: { invite_id: inviteId } });
  check('C accepts own invite', cAccept.status < 300, `status ${cAccept.status} ${JSON.stringify(cAccept.data)}`);
  const cRead = await db(users.c.jwt, `household_state?household_id=eq.${hA}&select=data`);
  check('C reads A household after joining', cRead.status === 200 && cRead.data.length === 1 && cRead.data[0].data.marker === 'A', JSON.stringify(cRead.data));
  const cReaccept = await db(users.c.jwt, 'rpc/accept_household_invite', { method: 'POST', body: { invite_id: inviteId } });
  check('re-accepting a used invite fails', cReaccept.status >= 400, `status ${cReaccept.status}`);

  // Expired invite cannot be accepted.
  const expired = await sql(`insert into public.household_invites (household_id, invited_email, invited_by, status, expires_at)
    values ('${hA}', '${users.b.email}', '${users.a.id}', 'pending', now() - interval '1 day') returning id`);
  const expiredId = expired?.[0]?.id;
  if (expiredId) {
    const bAcceptExpired = await db(users.b.jwt, 'rpc/accept_household_invite', { method: 'POST', body: { invite_id: expiredId } });
    check('expired invite cannot be accepted', bAcceptExpired.status >= 400, `status ${bAcceptExpired.status}`);
  } else {
    check('expired invite setup', false, 'insert returned no id');
  }

  // Removed member loses access immediately (their JWT is still valid).
  const rem = await db(users.a.jwt, `household_members?household_id=eq.${hA}&user_id=eq.${users.c.id}`, { method: 'DELETE', prefer: 'return=minimal' });
  check('owner removes C', rem.status < 300, `status ${rem.status}`);
  const cReadAfter = await db(users.c.jwt, `household_state?household_id=eq.${hA}&select=data`);
  check('removed member reads zero rows', cReadAfter.status === 200 && cReadAfter.data.length === 0, JSON.stringify(cReadAfter.data));
  const cUpdAfter = await db(users.c.jwt, `household_state?household_id=eq.${hA}`, { method: 'PATCH', body: { data: { marker: 'hijack' } }, prefer: 'return=representation' });
  check('removed member cannot write', cUpdAfter.status >= 400 || (Array.isArray(cUpdAfter.data) && cUpdAfter.data.length === 0), `status ${cUpdAfter.status}`);

  // Non-owner member cannot remove others (B is not in H1; C re-added then tries to remove A).
  await db(users.a.jwt, 'household_members', { method: 'POST', body: { household_id: hA, user_id: users.c.id, role: 'member' }, prefer: 'return=minimal' });
  const cRemA = await db(users.c.jwt, `household_members?household_id=eq.${hA}&user_id=eq.${users.a.id}`, { method: 'DELETE', prefer: 'return=representation' });
  check('plain member cannot remove the owner', cRemA.status >= 400 || (Array.isArray(cRemA.data) && cRemA.data.length === 0), `status ${cRemA.status}`);
  await db(users.a.jwt, `household_members?household_id=eq.${hA}&user_id=eq.${users.c.id}`, { method: 'DELETE', prefer: 'return=minimal' });

  // 5. Operator migration dry-run on a SYNTHETIC legacy row (real table, fake
  // id, deleted in this run). Owner = C (household-less), mirroring how his
  // account will be bound. Verifies backup, copy fidelity, tombstone, access,
  // and the rollback block from docs/operator-migration.sql.
  const legacyData = { plan: { weeks: [{ marker: 'legacy' }] }, days: { '2026-01-01': { a: { v: 'yes', at: 1 } } }, _device: 'dryrun' };
  await sql(`insert into public.meal_state (id, data, updated_at) values ('${syntheticCode}', '${JSON.stringify(legacyData)}'::jsonb, now())`);
  await sql(`insert into public.legacy_state_backup (id, data)
    select id, data from public.meal_state where id = '${syntheticCode}' or id like '${syntheticCode}:%' on conflict (id) do nothing`);
  const hhRows = await sql(`insert into public.households (legacy_code, created_by) values ('${syntheticCode}', '${users.c.id}') returning id`);
  const hC = hhRows?.[0]?.id; householdIds.push(hC);
  await sql(`insert into public.household_members (household_id, user_id, role, added_by) values ('${hC}', '${users.c.id}', 'owner', '${users.c.id}')`);
  await sql(`insert into public.household_state (household_id, data, updated_by)
    select '${hC}', data - '_device', '${users.c.id}' from public.meal_state where id = '${syntheticCode}'`);
  const match = await sql(`select (select data from public.household_state where household_id = '${hC}')
    = (select data - '_device' from public.legacy_state_backup where id = '${syntheticCode}') as copy_matches`);
  check('migration copy matches backup', match?.[0]?.copy_matches === true, JSON.stringify(match));
  await sql(`update public.meal_state set data = jsonb_build_object('_migrated', true), updated_at = now() where id = '${syntheticCode}'`);
  const cMigrated = await db(users.c.jwt, `household_state?household_id=eq.${hC}&select=data`);
  check('migrated owner reads plan via account sync', cMigrated.status === 200 && cMigrated.data[0]?.data?.plan?.weeks?.[0]?.marker === 'legacy', JSON.stringify(cMigrated.data));
  const aReadC = await db(users.a.jwt, `household_state?household_id=eq.${hC}&select=data`);
  check('outsider cannot read migrated household', aReadC.status === 200 && aReadC.data.length === 0, JSON.stringify(aReadC.data));

  // Rollback restores the legacy row and removes the household.
  await sql(`update public.meal_state m set data = b.data, updated_at = now()
    from public.legacy_state_backup b where m.id = '${syntheticCode}' and b.id = '${syntheticCode}'`);
  await sql(`delete from public.households where id = '${hC}'`);
  householdIds.pop();
  // Compare inside Postgres: jsonb normalizes key order, so JS string compare
  // would false-fail.
  const restored = await sql(`select (select data from public.meal_state where id = '${syntheticCode}')
    = '${JSON.stringify(legacyData)}'::jsonb as restored_ok`);
  check('rollback restores legacy row exactly', restored?.[0]?.restored_ok === true, JSON.stringify(restored));

  // 6. Cleanup synthetic artifacts.
  await sql(`delete from public.meal_state where id = '${syntheticCode}' or id like '${syntheticCode}:%'`);
  await sql(`delete from public.legacy_state_backup where id = '${syntheticCode}' or id like '${syntheticCode}:%'`);
  await sql(`delete from public.household_invites where household_id in ('${hA}','${hB}')`);
  for (const hid of householdIds) await sql(`delete from public.households where id = '${hid}'`);
} catch (e) {
  console.error('SETUP ERROR:', e.message);
  failures++;
} finally {
  if (secret) {
    for (const u of Object.values(users)) {
      if (u?.id) await admin(`/admin/users/${u.id}`, secret, 'DELETE').catch(() => {});
    }
  }
}

console.log(failures ? `\n${failures} FAILURE(S)` : '\nAll adversarial checks passed');
process.exit(failures ? 1 : 0);
