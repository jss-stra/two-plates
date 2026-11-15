// Adversarial access test for household_state RLS (stage 6).
// Creates two REAL test users through the Supabase Admin API (service key from
// the Management API), exercises the policies as each user and as anon, then
// cleans up. Run only after docs/auth-stage6.sql is applied.
//
//   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/test-household-rls.mjs
//
// No secrets are printed; test-user credentials live only in this process.
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

async function sql(query) {
  return mgmt(`/projects/${REF}/database/query`, 'POST', { query });
}

async function admin(path, key, method = 'GET', body) {
  const r = await fetch(`${SUPA_URL}/auth/v1${path}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok && method !== 'DELETE') throw new Error(`Admin API ${method} ${path}: ${r.status} ${await r.text()}`);
  return method === 'DELETE' ? null : r.json();
}

// PostgREST call as a specific user JWT (or anon with the publishable key).
async function db(key, table, { method = 'GET', query = '', body, prefer } = {}) {
  const r = await fetch(`${SUPA_URL}/rest/v1/${table}${query}`, {
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
const emailA = `rls-test-a-${stamp}@example.invalid`;
const emailB = `rls-test-b-${stamp}@example.invalid`;
const password = crypto.randomUUID() + crypto.randomUUID();
let userA, userB, jwtA, jwtB, secret;

try {
  // 1. Service key from the Management API (never printed).
  const keys = await mgmt(`/projects/${REF}/api-keys?reveal=true`);
  secret = (keys || []).find((k) => k.type === 'service_role' || k.api_key?.startsWith('sb_secret'))?.api_key;
  if (!secret) throw new Error('No service/secret API key available via Management API');

  // 2. Two real test users, confirmed, random passwords.
  userA = await admin('/admin/users', secret, 'POST', { email: emailA, password, email_confirm: true });
  userB = await admin('/admin/users', secret, 'POST', { email: emailB, password, email_confirm: true });

  // 3. Real sessions via password grant.
  for (const [email, set] of [[emailA, (t) => (jwtA = t)], [emailB, (t) => (jwtB = t)]]) {
    const r = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { apikey: PUB, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(`password grant failed for ${email}: ${r.status}`);
    set(j.access_token);
  }

  // 4. Each user creates their own household through the real policies.
  async function makeHousehold(jwt) {
    const h = await db(jwt, 'households', { method: 'POST', body: {}, prefer: 'return=representation' });
    if (h.status >= 300) throw new Error(`household insert: ${h.status} ${JSON.stringify(h.data)}`);
    const hid = h.data[0].id;
    // owner membership is created by the app's own flow (cookbook.js)
    const m = await db(jwt, 'household_members', {
      method: 'POST',
      body: { household_id: hid, role: 'owner' }, // user_id defaults? no: app sends it
      prefer: 'return=minimal',
    });
    // The app sends user_id explicitly; retry with it when policy/default requires.
    if (m.status >= 300) {
      const uid = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString()).sub;
      const m2 = await db(jwt, 'household_members', {
        method: 'POST', body: { household_id: hid, user_id: uid, role: 'owner' }, prefer: 'return=minimal',
      });
      if (m2.status >= 300) throw new Error(`membership insert: ${m2.status} ${JSON.stringify(m2.data)}`);
    }
    return hid;
  }
  const hA = await makeHousehold(jwtA);
  const hB = await makeHousehold(jwtB);

  // 5. Seed each household's state as its owner.
  const seedA = await db(jwtA, 'household_state', { method: 'POST', body: { household_id: hA, data: { marker: 'A' } }, prefer: 'return=minimal' });
  check('A seeds own household state', seedA.status < 300, JSON.stringify(seedA.data));
  const seedB = await db(jwtB, 'household_state', { method: 'POST', body: { household_id: hB, data: { marker: 'B' } }, prefer: 'return=minimal' });
  check('B seeds own household state', seedB.status < 300, JSON.stringify(seedB.data));

  // 6. Adversarial reads/writes.
  const aRead = await db(jwtA, 'household_state', { query: '?select=household_id,data' });
  check('A reads only own household', aRead.status === 200 && aRead.data.length === 1 && aRead.data[0].household_id === hA, JSON.stringify(aRead.data));

  const aReadB = await db(jwtA, 'household_state', { query: `?household_id=eq.${hB}&select=household_id` });
  check('A reading B by id gets zero rows', aReadB.status === 200 && aReadB.data.length === 0, `status ${aReadB.status} rows ${aReadB.data?.length}`);

  const aUpdB = await db(jwtA, 'household_state', { method: 'PATCH', query: `?household_id=eq.${hB}`, body: { data: { marker: 'hijack' } }, prefer: 'return=representation' });
  check('A cannot update B', aUpdB.status >= 400 || (Array.isArray(aUpdB.data) && aUpdB.data.length === 0), `status ${aUpdB.status} ${JSON.stringify(aUpdB.data)}`);

  const aInsB = await db(jwtA, 'household_state', { method: 'POST', body: { household_id: hB, data: { marker: 'hijack' } }, prefer: 'return=representation' });
  check('A cannot insert into B', aInsB.status >= 400, `status ${aInsB.status}`);

  const aDelOwn = await db(jwtA, 'household_state', { method: 'DELETE', query: `?household_id=eq.${hA}`, prefer: 'return=representation' });
  check('no client delete on household_state', aDelOwn.status >= 400 || (Array.isArray(aDelOwn.data) && aDelOwn.data.length === 0), `status ${aDelOwn.status}`);

  const anon = await db(PUB, 'household_state', { query: '?select=household_id' });
  check('anon reads zero rows', anon.status === 200 && anon.data.length === 0, `status ${anon.status} rows ${anon.data?.length}`);

  const anonIns = await db(PUB, 'household_state', { method: 'POST', body: { household_id: hA, data: {} }, prefer: 'return=minimal' });
  check('anon cannot insert', anonIns.status >= 400, `status ${anonIns.status}`);

  const bakA = await db(jwtA, 'legacy_state_backup', { query: '?select=id' });
  check('backup table refuses authenticated read', bakA.status >= 400 || bakA.data?.length === 0, `status ${bakA.status}`);

  // Cleanup: households (cascades state + members) and users.
  await sql(`delete from public.households where id in ('${hA}','${hB}')`);
} catch (e) {
  console.error('SETUP ERROR:', e.message);
  failures++;
} finally {
  if (secret) {
    if (userA?.id) await admin(`/admin/users/${userA.id}`, secret, 'DELETE').catch(() => {});
    if (userB?.id) await admin(`/admin/users/${userB.id}`, secret, 'DELETE').catch(() => {});
  }
}

console.log(failures ? `\n${failures} FAILURE(S)` : '\nAll adversarial checks passed');
process.exit(failures ? 1 : 0);
