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

// Push + notification clicks: a water check-in notification carries the slot and
// person, shows Yes/No actions where the platform supports them, and a tap
// records the answer (or opens the in-app question) through launch params.
{
  const events = {}, shown = [], posted = [], opened = [], focused = [], navigated = [];
  let openClients = [];
  const context = {
    URL, Uint8Array, crypto: webcrypto,
    fetch: async url => new Response(await readFile(new URL(url).pathname.replace('/two-plates/', ''))),
    caches: { open: async () => ({ put: async () => {} }), delete: async () => {} },
    clients: {
      matchAll: async () => openClients,
      openWindow: async (u) => { opened.push(u); },
    },
    self: {
      registration: { scope: 'https://example.invalid/two-plates/', showNotification: async (t, o) => shown.push({ t, o }) },
      location: { origin: 'https://example.invalid' },
      addEventListener: (name, fn) => events[name] = fn,
      skipWaiting: async () => {},
    },
  };
  vm.runInNewContext(script, context);

  const payload = { title: 'Two Plates — water check-in', body: 'Did you drink water? Tap to answer yes or no', tag: 'water-15', kind: 'water-checkin', slot: 15, person: 0, actions: [{ action: 'yes', title: 'Yes' }, { action: 'no', title: 'No' }] };
  await events.push({ data: { json: () => payload }, waitUntil: p => p });
  assert.equal(shown.length, 1);
  assert.equal(shown[0].o.tag, 'water-15');
  // Objects crossing the vm realm boundary fail deepStrictEqual's prototype check;
  // compare their JSON instead.
  assert.equal(JSON.stringify(shown[0].o.actions), JSON.stringify(payload.actions));
  assert.equal(JSON.stringify(shown[0].o.data), JSON.stringify({ url: './#today', kind: 'water-checkin', slot: 15, person: 0 }));

  const click = async (action, data = { kind: 'water-checkin', slot: 15, person: 0 }) => {
    let p; events.notificationclick({ notification: { data, close() {} }, action, waitUntil: x => p = x });
    await p;
  };

  // App closed, Yes tapped on the notification: opens the recording URL.
  await click('yes');
  assert.deepEqual(opened, ['./?water=yes&slot=15&p=0#today']);
  // App closed, notification body tapped (iOS shows no action buttons): the
  // in-app Yes/No question opens for the same slot instead.
  opened.length = 0;
  await click('');
  assert.deepEqual(opened, ['./?waterPrompt=15&p=0#today']);

  // App open, No tapped: the open window gets the answer and focus, no navigation.
  openClients = [{ postMessage: (m) => posted.push(m), focus: async () => focused.push(1), navigate: (u) => navigated.push(u) }];
  await click('no');
  assert.equal(JSON.stringify(posted), JSON.stringify([{ type: 'water-checkin', slot: 15, answer: 'no', person: 0 }]));
  assert.equal(focused.length, 1);
  assert.deepEqual(navigated, []);

  // A non-check-in notification keeps the old navigate-and-focus behaviour.
  await click('', { url: './#today' });
  assert.deepEqual(navigated, ['./#today']);
  console.log('SW: check-in push shows actions/tag/slot; clicks record via launch URL or message the open app');
}
