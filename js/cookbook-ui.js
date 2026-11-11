// Cookbook UI: private dish saving (photo + name), the explicit share composer,
// the people card (household + friends), and the feed.
// Boundaries enforced here (server RLS is the real gate):
// - Saving is always private. There is no "save and post" combo.
// - Sharing is a separate explicit action with its own sheet, audience pick and
//   publish button. The post carries a snapshot taken at publish time.
// - Photos render via short-lived signed URLs only. Feed URLs use a ~2 minute
//   TTL: issuance is the authorization point (can_view_photo), and an issued
//   URL stays usable until expiry even if access is revoked - the TTL is the
//   revocation delay bound, and it is not immediate.
import { authUser, authReady, onAuth } from './auth.js';
import {
  uploadPhoto, saveEntry, deleteEntry, listEntries, publishEntry, signedPhotoUrl,
  readFeed, unpublish, hidePost, reportPost, feedPhotoUrl,
  listMyHousehold, createHousehold, inviteToHousehold, listMyInvites, acceptInvite,
  leaveHousehold, removeHouseholdMember,
  requestFriendByEmail, listFriendLinks, respondFriendRequest, endFriendLink,
} from './cookbook.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Ship gate: sharing features (feed, people, share composer) stay hidden until
// Google sign-in is open beyond the OAuth test-user list (consent-screen
// decision is the owner's). Private cookbook save works regardless.
export const SHARING_ENABLED = false;

// Local UI state (owned here; app.js calls the render hooks).
export const cb = {
  entries: null,     // null = not loaded yet
  sheet: null,       // null | 'add' | { share: <entry id> }
  photo: null,       // File picked in the add sheet
  busy: false,
  signed: new Map(), // photo_path -> signed url (owner thumbnails, 1h)
  feed: null,        // null = not loaded yet; else array of posts
  feedSigned: new Map(), // photo_path -> { url, exp } (feed, ~2min TTL)
  people: null,      // null = not loaded; else { household, invites, links }
};

const AUDIENCES = [
  ['me', 'Just me', 'Only you can see this post.'],
  ['family', 'Family', 'People in your household.'],
  ['friends', 'Friends', 'People you have linked as friends.'],
  ['public', 'Public', 'Anyone signed in can see this.'],
];

let rerender = () => {};
export function bindCookbook(renderFn) { rerender = renderFn; }

function toastMsg(msg) {
  window.dispatchEvent(new CustomEvent('cb-toast', { detail: msg }));
}

async function refreshEntries() {
  try { cb.entries = await listEntries(); }
  catch (e) { cb.entries = []; }
  rerender();
  // Owner-only thumbnails via signed URLs, filled in after the list renders.
  for (const en of cb.entries || []) {
    if (!en.photo_path || cb.signed.has(en.photo_path)) continue;
    try {
      const url = await signedPhotoUrl(en.photo_path, 3600);
      cb.signed.set(en.photo_path, url);
      rerender();
    } catch { /* photo stays as placeholder */ }
  }
}

export async function refreshFeed() {
  try { cb.feed = await readFeed(); }
  catch (e) { cb.feed = []; }
  rerender();
  // Feed photos: short-TTL signed URLs. Issuance is server-gated; a denied
  // request just leaves the placeholder.
  const now = Date.now();
  for (const p of cb.feed || []) {
    const path = p.payload?.photo_path;
    if (!path) continue;
    const cached = cb.feedSigned.get(path);
    if (cached && cached.exp > now + 15000) continue;
    try {
      const url = await feedPhotoUrl(path);
      cb.feedSigned.set(path, { url, exp: now + 110000 });
      rerender();
    } catch { /* not authorized for this photo: placeholder stays */ }
  }
}

async function refreshPeople() {
  try {
    const [household, invites, links] = await Promise.all([listMyHousehold(), listMyInvites(), listFriendLinks()]);
    cb.people = { household, invites, links };
  } catch (e) {
    cb.people = { household: null, invites: [], links: [], error: e.message };
  }
  rerender();
}

export function initCookbook() {
  // A signed URL that fails to load (expired, file gone) swaps back to the
  // placeholder instead of a broken-image icon. Error events don't bubble,
  // so listen in the capture phase.
  document.addEventListener('error', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLImageElement)) return;
    if (t.dataset.cbSrc && cb.signed.delete(t.dataset.cbSrc)) rerender();
    if (t.dataset.feedSrc && cb.feedSigned.delete(t.dataset.feedSrc)) rerender();
  }, true);
  onAuth((u) => {
    cb.entries = null;
    cb.sheet = null;
    cb.photo = null;
    cb.signed.clear();
    cb.feed = null;
    cb.feedSigned.clear();
    cb.people = null;
    if (u) { refreshEntries(); refreshPeople(); } else rerender();
  });
  if (authUser()) { refreshEntries(); refreshPeople(); }
}

// ---------- Feed view ----------
export function renderFeed() {
  if (!SHARING_ENABLED) return '';
  if (!authReady()) return `<section class="card"><h2>Feed</h2><p class="fine">Checking sign-in…</p></section>`;
  if (!authUser()) return `<section class="card"><h2>Feed</h2>
    <p class="fine">Sign in to see dishes shared with you - family, friends and public posts.</p></section>`;
  if (cb.feed === null) return `<section class="card"><h2>Feed</h2><p class="fine">Loading…</p></section>`;
  const me = authUser().id;
  const items = cb.feed;
  const body = items.length === 0
    ? '<p class="fine">Nothing shared with you yet. When people in your household or friends post a dish, it shows up here.</p>'
    : items.map((p) => {
      const pl = p.payload || {};
      const own = p.author === me;
      const audLabel = { me: 'Just me', family: 'Family', friends: 'Friends', public: 'Public' }[p.audience] || p.audience;
      const ings = Array.isArray(pl.ingredients) && pl.ingredients.length
        ? `<details class="feed-ings"><summary>${pl.ingredients.length} ingredients</summary><ul>${pl.ingredients.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></details>`
        : '';
      return `<article class="card feed-post">
        ${pl.photo_path
          ? (cb.feedSigned.has(pl.photo_path)
            ? `<img class="feed-photo" data-feed-src="${esc(pl.photo_path)}" alt="" src="${esc(cb.feedSigned.get(pl.photo_path).url)}">`
            : '<div class="feed-photo feed-photo-ph" aria-hidden="true">🍽</div>')
          : ''}
        <header class="feed-head">
          <div><b>${esc(pl.title || 'Dish')}</b>
            <div class="fine">${own ? 'You' : esc(pl.author_name || 'Someone')} · ${esc(new Date(p.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }))} · <span class="feed-aud">${esc(audLabel)}</span></div>
          </div>
        </header>
        ${p.caption ? `<p class="feed-cap">${esc(p.caption)}</p>` : ''}
        ${ings}
        <div class="feed-acts">
          ${own
            ? `<button class="link" data-act="feed-delete" data-id="${esc(p.id)}">Delete post</button>`
            : `<button class="link" data-act="feed-hide" data-id="${esc(p.id)}">Hide</button>
               <button class="link" data-act="feed-report" data-id="${esc(p.id)}">Report</button>`}
        </div>
      </article>`;
    }).join('');
  return `<section class="feed">${body}</section>
    <p class="fine feed-note">Photos load through links that expire about two minutes after they are issued. If sharing is turned off for a dish, no new photo links are issued; a link already issued may keep working until it expires, and anything already saved or screenshotted cannot be recalled.</p>`;
}

// ---------- People card (Settings) ----------
export function renderPeople() {
  if (!SHARING_ENABLED) return '';
  if (!authReady() || !authUser()) return '';
  const p = cb.people;
  if (p === null) return `<section class="card" id="people-card"><h2>Household &amp; friends</h2><p class="fine">Loading…</p></section>`;
  const hh = p.household;
  const me = authUser().id;

  const hhBlock = hh ? `
    <div class="hh">
      <h3>Your household</h3>
      <ul class="hh-members">
        ${hh.members.map((m) => `<li>${esc(m.name)}${m.role === 'owner' ? ' <span class="fine">(owner)</span>' : ''}
          ${(m.user_id !== me && hh.myRole === 'owner') ? `<button class="link" data-act="hh-remove" data-hh="${esc(hh.id)}" data-id="${esc(m.user_id)}">Remove</button>` : ''}
          ${(m.user_id === me && hh.myRole !== 'owner') ? `<button class="link" data-act="hh-leave" data-hh="${esc(hh.id)}">Leave</button>` : ''}
        </li>`).join('')}
      </ul>
      ${hh.myRole === 'owner' ? `
        <div class="inline">
          <input id="hh-invite-email" type="email" placeholder="Invite by email" autocomplete="off">
          <button class="btn small" data-act="hh-invite" data-hh="${esc(hh.id)}" ${cb.busy ? 'disabled' : ''}>Invite</button>
        </div>
        <p class="fine">They get the invite when they sign in with that email; it expires after 7 days.</p>` : ''}
    </div>` : `
    <div class="hh">
      <h3>Household</h3>
      <p class="fine">A household is who "Family" posts go to.</p>
      <button class="btn" data-act="hh-create" ${cb.busy ? 'disabled' : ''}>Start a household</button>
    </div>`;

  const inviteBlock = (p.invites || []).length ? `
    <div class="hh-invites">
      <h3>Invites for you</h3>
      ${p.invites.map((i) => `<div class="invite-row">Household invite (expires ${esc(new Date(i.expires_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }))})
        <button class="btn small primary" data-act="hh-accept" data-id="${esc(i.id)}" ${cb.busy ? 'disabled' : ''}>Accept</button></div>`).join('')}
    </div>` : '';

  const links = p.links || [];
  const incoming = links.filter((l) => l.addressee === me && l.status === 'pending');
  const friends = links.filter((l) => l.status === 'accepted');
  // While a request is pending the requester cannot read the addressee's name
  // (server policy), so outgoing rows show a generic label by design.
  const nameOf = (l) => (l.requester === me ? l.addressee_name : l.requester_name) || 'Friend';

  const friendBlock = `
    <div class="friends">
      <h3>Friends</h3>
      <p class="fine">Friends see your "Friends" posts (and your public ones).</p>
      ${friends.length ? `<ul class="hh-members">${friends.map((l) => {
        return `<li>${esc(nameOf(l))} <button class="link" data-act="fr-end" data-id="${esc(l.id)}">Unfriend</button></li>`;
      }).join('')}</ul>` : '<p class="fine">No friends linked yet.</p>'}
      ${incoming.length ? `<div class="hh-invites">${incoming.map((l) => `<div class="invite-row">${esc(nameOf(l))} wants to link as friends
        <button class="btn small primary" data-act="fr-accept" data-id="${esc(l.id)}" ${cb.busy ? 'disabled' : ''}>Accept</button>
        <button class="btn small ghost" data-act="fr-decline" data-id="${esc(l.id)}" ${cb.busy ? 'disabled' : ''}>Decline</button></div>`).join('')}</div>` : ''}
      <div class="inline">
        <input id="fr-email" type="email" placeholder="Add friend by email" autocomplete="off">
        <button class="btn small" data-act="fr-request" ${cb.busy ? 'disabled' : ''}>Send request</button>
      </div>
      <p class="fine">We don't show whether an email has an account - if they are signed up, your request is waiting for them when they next sign in, and you will see them here once they accept.</p>
    </div>`;

  return `<section class="card" id="people-card"><h2>Household &amp; friends</h2>
    ${p.error ? `<p class="fine">Could not load: ${esc(p.error)}</p>` : ''}
    ${inviteBlock}${hhBlock}${friendBlock}
  </section>`;
}

// ---------- Settings card ----------
export function renderCookbook() {
  if (!authReady() || !authUser()) return '';
  const items = cb.entries;
  const list = items === null
    ? '<p class="fine">Loading your cookbook…</p>'
    : items.length === 0
      ? '<p class="fine">Nothing saved yet. Add a dish with a photo and a name - it stays private unless you choose to share it.</p>'
      : `<div class="cb-list">${items.map((en) => `
        <div class="cb-row">
          ${en.photo_path && cb.signed.has(en.photo_path)
            ? `<img class="cb-thumb" data-cb-src="${esc(en.photo_path)}" alt="" src="${esc(cb.signed.get(en.photo_path))}">`
            : '<span class="cb-thumb cb-nothumb" aria-hidden="true">🍽</span>'}
          <div class="cb-main">
            <div class="cb-title">${esc(en.title)}</div>
            <div class="fine">${esc(new Date(en.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }))}</div>
          </div>
          <button class="link" data-act="cb-remove" data-id="${esc(en.id)}">Remove</button>
          ${SHARING_ENABLED ? `<button class="btn small" data-act="cb-share" data-id="${esc(en.id)}">Share…</button>` : ''}
        </div>`).join('')}</div>`;
  return `<section class="card" id="cookbook-card">
    <h2>My cookbook</h2>
    <p class="fine">Private to you. Saving a dish never posts it - sharing is always a separate choice.</p>
    ${list}
    <button class="btn primary" data-act="cb-add">Add a dish</button>
  </section>`;
}

// ---------- Sheets ----------
export function renderCbSheet(rootEl) {
  const sheetEl = rootEl;
  sheetEl.hidden = false;
  document.body.classList.add('sheet-open');
  if (cb.sheet === 'add') {
    sheetEl.innerHTML = `<div class="backdrop" data-act="cb-close"></div>
    <div class="sheet" role="dialog" aria-label="Add a dish">
      <header><div><h2>Add a dish</h2><div class="fine">Saved privately to your cookbook.</div></div>
        <button class="act icon-only" data-act="cb-close" aria-label="Close">✕</button></header>
      <div class="cb-form">
        <label class="field"><span>Photo (optional)</span>
          <input type="file" accept="image/*" data-cb-photo>
        </label>
        <div id="cb-preview" class="cb-preview" hidden></div>
        <label class="field"><span>Dish name</span>
          <input id="cb-title" type="text" placeholder="e.g. Chicken burrito bowl" autocomplete="off">
        </label>
        <label class="field"><span>Ingredients (optional, one per line)</span>
          <textarea id="cb-ings" rows="4" placeholder="chicken breast&#10;rice&#10;black beans"></textarea>
        </label>
        <button class="btn primary wide" data-act="cb-save" ${cb.busy ? 'disabled' : ''}>${cb.busy ? 'Saving…' : 'Save privately'}</button>
      </div>
    </div>`;
    if (cb.photo) showPreview(cb.photo);
    return;
  }
  const shareId = cb.sheet && cb.sheet.share;
  const en = (cb.entries || []).find((x) => x.id === shareId);
  if (!en) { cb.sheet = null; rerender(); return; }
  sheetEl.innerHTML = `<div class="backdrop" data-act="cb-close"></div>
  <div class="sheet" role="dialog" aria-label="Share dish">
    <header><div><h2>Share “${esc(en.title)}”</h2>
      <div class="fine">Posts a snapshot of the dish as it is now. Later private edits won't change the post.</div></div>
      <button class="act icon-only" data-act="cb-close" aria-label="Close">✕</button></header>
    <div class="cb-form">
      <label class="field"><span>Caption (optional)</span>
        <input id="cb-caption" type="text" placeholder="Say something about it…" autocomplete="off">
      </label>
      <div class="cb-aud" role="radiogroup" aria-label="Audience">
        ${AUDIENCES.map(([v, label, hint], i) => `
        <label class="cb-aud-row">
          <input type="radio" name="cb-audience" value="${v}" ${i === 0 ? 'checked' : ''}>
          <span><b>${label}</b><br><span class="fine">${hint}</span></span>
        </label>`).join('')}
      </div>
      <p class="fine">Photos go with the post for everyone in the audience. If you later delete the post or unlink someone, we stop issuing new photo links to them straight away. A link already issued may keep working for up to about two minutes, and anything already saved or screenshotted cannot be recalled.</p>
      <button class="btn primary wide" data-act="cb-publish" data-id="${esc(en.id)}" ${cb.busy ? 'disabled' : ''}>${cb.busy ? 'Posting…' : 'Post'}</button>
    </div>
  </div>`;
}

function showPreview(file) {
  const box = document.getElementById('cb-preview');
  if (!box) return;
  const url = URL.createObjectURL(file);
  box.innerHTML = `<img src="${url}" alt="Chosen photo">`;
  box.hidden = false;
}

// ---------- Actions (merged into app.js actions) ----------
export const cbActions = {
  'cb-add': () => { cb.sheet = 'add'; cb.photo = null; rerender(); },
  'cb-close': () => { cb.sheet = null; cb.photo = null; cb.busy = false; rerender(); },
  'cb-save': async () => {
    const title = (document.getElementById('cb-title')?.value || '').trim();
    if (!title) { toastMsg('Give the dish a name first'); return; }
    const lines = (document.getElementById('cb-ings')?.value || '').split('\n').map((x) => x.trim()).filter(Boolean);
    cb.busy = true; rerender();
    try {
      let photoPath = null;
      if (cb.photo) photoPath = await uploadPhoto(cb.photo);
      await saveEntry({ title, photoPath, ingredients: lines.length ? lines : null });
      cb.sheet = null; cb.photo = null;
      toastMsg('Saved to your cookbook (private)');
      await refreshEntries();
    } catch (e) {
      toastMsg(`Not saved: ${e.message}`);
    } finally { cb.busy = false; rerender(); }
  },
  'cb-share': (el) => { cb.sheet = { share: el.dataset.id }; rerender(); },
  'cb-remove': async (el) => {
    const en = (cb.entries || []).find((x) => x.id === el.dataset.id);
    if (!en) return;
    if (!window.confirm(`Remove "${en.title}" from your cookbook? This deletes the dish and its photo.`)) return;
    cb.busy = true; rerender();
    try {
      await deleteEntry(en);
      toastMsg('Removed from your cookbook');
      await refreshEntries();
    } catch (e) {
      toastMsg(`Not removed: ${e.message}`);
    } finally { cb.busy = false; rerender(); }
  },
  'cb-publish': async (el) => {
    const en = (cb.entries || []).find((x) => x.id === el.dataset.id);
    if (!en) return;
    const aud = document.querySelector('input[name="cb-audience"]:checked')?.value || 'me';
    const caption = (document.getElementById('cb-caption')?.value || '').trim();
    cb.busy = true; rerender();
    try {
      await publishEntry(en, aud, caption);
      cb.sheet = null;
      const label = (AUDIENCES.find(([v]) => v === aud) || [])[1] || aud;
      toastMsg(`Posted to ${label}`);
      refreshFeed();
    } catch (e) {
      toastMsg(`Not posted: ${e.message}`);
    } finally { cb.busy = false; rerender(); }
  },

  // Feed
  'feed-refresh': () => refreshFeed(),
  'feed-delete': async (el) => {
    try {
      await unpublish(el.dataset.id);
      toastMsg('Post deleted');
      await refreshFeed();
    } catch (e) { toastMsg(`Not deleted: ${e.message}`); }
  },
  'feed-hide': async (el) => {
    try {
      await hidePost(el.dataset.id);
      toastMsg('Hidden from your feed');
      await refreshFeed();
    } catch (e) { toastMsg(`Not hidden: ${e.message}`); }
  },
  'feed-report': async (el) => {
    if (!window.confirm('Report this post? It will be flagged for review.')) return;
    try {
      await reportPost(el.dataset.id);
      toastMsg('Reported - thanks for flagging it');
    } catch (e) { toastMsg(`Could not report: ${e.message}`); }
  },

  // Household
  'hh-create': async () => {
    cb.busy = true; rerender();
    try { await createHousehold(); toastMsg('Household started - invite your people'); }
    catch (e) { toastMsg(`Not created: ${e.message}`); }
    finally { cb.busy = false; await refreshPeople(); }
  },
  'hh-invite': async (el) => {
    const email = (document.getElementById('hh-invite-email')?.value || '').trim();
    if (!email) { toastMsg('Type their email first'); return; }
    cb.busy = true; rerender();
    try { await inviteToHousehold(el.dataset.hh, email); toastMsg(`Invited ${email}`); }
    catch (e) { toastMsg(`Not invited: ${e.message}`); }
    finally { cb.busy = false; await refreshPeople(); }
  },
  'hh-accept': async (el) => {
    cb.busy = true; rerender();
    try { await acceptInvite(el.dataset.id); toastMsg('Joined the household'); }
    catch (e) { toastMsg(`Could not join: ${e.message}`); }
    finally { cb.busy = false; await refreshPeople(); }
  },
  'hh-leave': async (el) => {
    try { await leaveHousehold(el.dataset.hh); toastMsg('Left the household'); }
    catch (e) { toastMsg(`Could not leave: ${e.message}`); }
    finally { await refreshPeople(); }
  },
  'hh-remove': async (el) => {
    try { await removeHouseholdMember(el.dataset.hh, el.dataset.id); toastMsg('Removed'); }
    catch (e) { toastMsg(`Could not remove: ${e.message}`); }
    finally { await refreshPeople(); }
  },

  // Friends: opaque request flow - the same toast whether or not the email
  // has an account. No existence signal is ever returned to the requester.
  'fr-request': async () => {
    const email = (document.getElementById('fr-email')?.value || '').trim();
    if (!email) { toastMsg('Type their email first'); return; }
    cb.busy = true; rerender();
    try {
      await requestFriendByEmail(email);
      toastMsg('If that email has an account, your request is waiting for them');
    } catch (e) { toastMsg(`Not sent: ${e.message}`); }
    finally { cb.busy = false; await refreshPeople(); }
  },
  'fr-accept': async (el) => {
    cb.busy = true; rerender();
    try { await respondFriendRequest(el.dataset.id, true); toastMsg('Friends linked'); }
    catch (e) { toastMsg(`Could not accept: ${e.message}`); }
    finally { cb.busy = false; await refreshPeople(); }
  },
  'fr-decline': async (el) => {
    cb.busy = true; rerender();
    try { await respondFriendRequest(el.dataset.id, false); toastMsg('Declined'); }
    catch (e) { toastMsg(`Could not decline: ${e.message}`); }
    finally { cb.busy = false; await refreshPeople(); }
  },
  'fr-end': async (el) => {
    try { await endFriendLink(el.dataset.id); toastMsg('Link removed'); }
    catch (e) { toastMsg(`Could not remove: ${e.message}`); }
    finally { await refreshPeople(); }
  },
};

export function cbOnChange(el) {
  if (el.dataset.cbPhoto !== undefined && el.files?.[0]) {
    cb.photo = el.files[0];
    showPreview(cb.photo);
    return true;
  }
  return false;
}
