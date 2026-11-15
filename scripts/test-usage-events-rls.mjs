// Adversarial access + vocabulary test for usage_events (usage-journal track).
// Creates two REAL test users via the Admin API, then verifies RLS isolation,
// the enumerated server-side vocabulary, the append-only surface, and the
// continuous volume bounds. Cleans up everything it creates.
//
//   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/test-usage-events-rls.mjs
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
const password = crypto.randomUUID() + crypto.randomUUID();
const users = {};
let secret;

async function makeUser(name) {
  const email = `ue-test-${name}-${stamp}@example.invalid`;
  const u = await admin('/admin/users', secret, 'POST', { email, password, email_confirm: true });
  const r = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: PUB, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`password grant failed for ${email}: ${r.status}`);
  users[name] = { id: u.id, jwt: j.access_token };
}

const ev = (kind, detail, cid) => ({ client_id: cid || `t-${crypto.randomUUID().slice(0, 18)}`, ts: new Date().toISOString(), kind, detail });

try {
  const keys = await mgmt(`/projects/${REF}/api-keys?reveal=true`);
  secret = (keys || []).find((k) => k.type === 'service_role' || k.api_key?.startsWith('sb_secret'))?.api_key;
  if (!secret) throw new Error('No service/secret API key available via Management API');
  await makeUser('a');
  await makeUser('b');

  // 1. Every allowed kind inserts for its owner.
  for (const [kind, detail] of [
    ['app-open', {}],
    ['tab', { t: 'week' }],
    ['act', { a: 'shuffle' }],
    ['gesture', { g: 'swipe-left', result: 'toggled' }],
    ['goal-check', { g: 'plan-week', result: 'yes' }],
  ]) {
    const r = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev(kind, detail), prefer: 'return=minimal' });
    check(`A inserts kind=${kind}`, r.status < 300, `status ${r.status} ${JSON.stringify(r.data)}`);
  }

  // 2. Vocabulary enforcement: unknown values rejected outright.
  const badAct = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('act', { a: 'not-a-real-action' }), prefer: 'return=minimal' });
  check('unknown act rejected', badAct.status >= 400, `status ${badAct.status}`);
  const badKind = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('screen-record', {}), prefer: 'return=minimal' });
  check('unknown kind rejected', badKind.status >= 400, `status ${badKind.status}`);
  const extraKey = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('act', { a: 'shuffle', text: 'what he typed' }), prefer: 'return=minimal' });
  check('extra detail key (typed text vector) rejected', extraKey.status >= 400, `status ${extraKey.status}`);
  const openDetail = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('app-open', { t: 'home' }), prefer: 'return=minimal' });
  check('app-open with detail rejected', openDetail.status >= 400, `status ${openDetail.status}`);
  const badCid = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('app-open', {}, 'bad'), prefer: 'return=minimal' });
  check('malformed client_id rejected', badCid.status >= 400, `status ${badCid.status}`);
  const badTab = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('tab', { t: 'secret-tab' }), prefer: 'return=minimal' });
  check('unknown tab rejected', badTab.status >= 400, `status ${badTab.status}`);

  // 3. Isolation and append-only.
  const aRows = await db(users.a.jwt, 'usage_events?select=id');
  check('A reads own events', aRows.status === 200 && aRows.data.length >= 5, `rows ${aRows.data?.length}`);
  const bRows = await db(users.b.jwt, 'usage_events?select=id');
  check('B reads zero of A events', bRows.status === 200 && bRows.data.length === 0, `rows ${bRows.data?.length}`);
  const spoof = await db(users.b.jwt, 'usage_events', { method: 'POST', body: { ...ev('app-open', {}), user_id: users.a.id }, prefer: 'return=minimal' });
  check('B cannot insert as A', spoof.status >= 400, `status ${spoof.status}`);
  const upd = await db(users.a.jwt, 'usage_events?id=gt.0', { method: 'PATCH', body: { kind: 'tab' }, prefer: 'return=representation' });
  check('no client update (append-only)', upd.status >= 400 || (Array.isArray(upd.data) && upd.data.length === 0), `status ${upd.status}`);
  const del = await db(users.a.jwt, 'usage_events?id=gt.0', { method: 'DELETE', prefer: 'return=representation' });
  check('no client delete', del.status >= 400 || (Array.isArray(del.data) && del.data.length === 0), `status ${del.status}`);
  const anonIns = await db(PUB, 'usage_events', { method: 'POST', body: ev('app-open', {}), prefer: 'return=minimal' });
  check('anon cannot insert', anonIns.status >= 400, `status ${anonIns.status}`);
  const anonRead = await db(PUB, 'usage_events?select=id');
  check('anon reads nothing', anonRead.status >= 400 || (anonRead.status === 200 && anonRead.data.length === 0), `status ${anonRead.status}`);

  // 4. Dedupe: same client_id twice for one user fails; same id for another user is fine.
  const dupBody = ev('tab', { t: 'home' }, `dup-${stamp}`);
  await db(users.a.jwt, 'usage_events', { method: 'POST', body: dupBody, prefer: 'return=minimal' });
  const dup = await db(users.a.jwt, 'usage_events', { method: 'POST', body: dupBody, prefer: 'return=minimal' });
  check('duplicate client_id for same user rejected', dup.status >= 400, `status ${dup.status}`);
  const otherUser = await db(users.b.jwt, 'usage_events', { method: 'POST', body: { ...dupBody, kind: 'tab', detail: { t: 'home' } }, prefer: 'return=minimal' });
  check('same client_id for another user allowed', otherUser.status < 300, `status ${otherUser.status}`);

  // 5. Continuous volume bound: 500 events/day per owner, enforced in the
  // trigger regardless of role. Seed 500 as A's id in one statement, then a
  // further insert as A must fail.
  const cnt = await sql(`select count(*)::int as n from public.usage_events where user_id = '${users.a.id}' and ts > now() - interval '1 day'`);
  const topUp = 500 - (cnt?.[0]?.n || 0);
  if (topUp > 0) {
    await sql(`insert into public.usage_events (user_id, client_id, ts, kind, detail)
      select '${users.a.id}', 'bulk-' || lpad(g::text, 6, '0'), now(), 'app-open', '{}'::jsonb from generate_series(1, ${topUp}) g`);
  }
  const capped = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('app-open', {}), prefer: 'return=minimal' });
  check('daily volume cap rejects beyond 500/day', capped.status >= 400, `status ${capped.status}`);
  await sql(`delete from public.usage_events where user_id = '${users.a.id}'`);
  const afterClean = await db(users.a.jwt, 'usage_events', { method: 'POST', body: ev('app-open', {}), prefer: 'return=minimal' });
  check('inserts work again after cleanup', afterClean.status < 300, `status ${afterClean.status}`);

  await sql(`delete from public.usage_events where user_id in ('${users.a.id}','${users.b.id}')`);
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

console.log(failures ? `\n${failures} FAILURE(S)` : '\nAll usage_events checks passed');
process.exit(failures ? 1 : 0);
