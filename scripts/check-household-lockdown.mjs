// Checks the database really is private. Reads ~/.two-plates/sync.json; read-only.
// Usage: node scripts/check-household-lockdown.mjs
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
const { url, key, household } = JSON.parse(readFileSync(`${homedir()}/.two-plates/sync.json`, 'utf8'));
const get = async (query, headers = {}) => {
  const r = await fetch(`${url}/rest/v1/meal_state?${query}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, ...headers } });
  return { status: r.status, body: await r.json().catch(() => null) };
};
let bad = 0;
const check = (name, ok, extra = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? ` (${extra})` : ''}`); if (!ok) bad++; };
const rows = (r) => (Array.isArray(r.body) ? r.body.length : -1);

const none = await get('select=id&limit=1000');
check('no household header: sees no rows', rows(none) === 0, `${rows(none)} rows`);
const wrong = await get('select=id&limit=1000', { 'x-household': 'home-not-a-real-code' });
check('wrong household code: sees no rows', rows(wrong) === 0, `${rows(wrong)} rows`);
const mine = await get('select=id&limit=1000', { 'x-household': household });
check('your household code: sees your own rows', rows(mine) > 0 && mine.body.every((x) => x.id.split(':')[0] === household), `${rows(mine)} rows`);
const other = await get(`select=id&id=like.${encodeURIComponent('home-%')}&limit=1000`, { 'x-household': household });
check('your code can\'t reach other households with a wildcard', rows(other) === rows(mine), `${rows(other)} vs ${rows(mine)}`);
// Only try the write probe once the reads are already locked: if the database is
// still open, the probe row would actually be written and can't be deleted.
if (bad) console.log('SKIP  write probe (database is still open, so a probe would leave a stray row)');
else {
  const w = await fetch(`${url}/rest/v1/meal_state`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'x-household': household }, body: JSON.stringify({ id: 'home-someone-else:lockdown-probe', data: {} }) });
  check('your code can\'t write into another household', w.status >= 400, `HTTP ${w.status}`);
}
console.log(bad ? `\n${bad} check(s) FAILED - run docs/household-lockdown-rollback.sql if sync is broken.` : '\nAll checks passed.');
process.exit(bad ? 1 : 0);
