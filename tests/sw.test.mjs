import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { webcrypto } from 'node:crypto';
import assert from 'node:assert/strict';
const script = await readFile('sw.js', 'utf8');
async function install(corrupt = false) {
  const events = {}, stored = new Map();
  let skipped = false, deleted = false, pending;
  const context = {
    URL, Uint8Array, crypto: webcrypto,
    fetch: async url => {
      const path = new URL(url).pathname.replace('/two-plates/', '');
      const bytes = await readFile(path);
      return new Response(corrupt && path === 'js/app.js' ? 'stale file' : bytes);
    },
    caches: {
      open: async () => ({ put: async (u,r) => stored.set(String(u), await r.text()) }),
      delete: async () => { deleted = true; stored.clear(); },
    },
    self: {
      registration: { scope: 'https://example.invalid/two-plates/' },
      location: { origin: 'https://example.invalid' },
      addEventListener: (name, fn) => events[name] = fn,
      skipWaiting: async () => skipped = true,
    },
  };
  vm.runInNewContext(script, context);
  events.install({ waitUntil: p => pending = p });
  if (corrupt) {
    await assert.rejects(pending, /Asset mismatch/);
    assert.equal(skipped, false, 'mismatched release must not activate');
    assert.equal(deleted, true);
    assert.equal(stored.size, 0);
  } else {
    await pending;
    assert.equal(skipped, true);
    assert.ok(stored.size >= 37);
    assert.equal(stored.get('https://example.invalid/two-plates/js/app.js'), await readFile('js/app.js','utf8'));
  }
}
await install();
await install(true);
console.log('SW: valid release verified; stale app.js rejects install, removes partial cache, never activates');
