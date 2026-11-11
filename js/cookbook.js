// Private cookbook + explicit publishing + people (household/friends) + feed.
// UNCOMMITTED work in progress. Rules baked in here:
// - Cookbook entries are private to their owner (RLS: ce_owner_all). Saving is
//   never posting.
// - Photos go to the private `cookbook-photos` bucket under <uid>/; they are
//   never world-readable. Non-owner reads are gated by can_view_photo(), which
//   mirrors the posts audience policy and authorizes NEW signed-url issuance
//   only. An issued signed URL is a bearer URL until it expires, so feed URLs
//   use a short TTL (FEED_PHOTO_TTL) and access loss is bounded by that TTL,
//   not immediate.
// - Publishing creates a post with an explicit, immutable payload snapshot built
//   at publish time (incl. the author's display name at that moment). Later
//   edits to the private entry never change the post. The photo is frozen too:
//   it is copied to a one-off shared/ path at publish time and the post
//   references the copy, so deleting or replacing the entry's private photo
//   can never silently mutate the post or leak a later image under the same
//   path.
// - Nothing posts to family/friends/public without an explicit publish call with
//   that audience; 'me' is the default and means no one else can read the post.
import { authClient, authUser } from './auth.js';

const BUCKET = 'cookbook-photos';
const FEED_PHOTO_TTL = 120; // seconds; bounds the bearer-URL window for non-owners

function requireUser() {
  const u = authUser();
  if (!u) throw new Error('Sign in first');
  return u;
}
function client() {
  const c = authClient();
  if (!c) throw new Error('Sign-in is unavailable right now.');
  return c;
}

// Photos: owner-scoped path enforced server-side by storage RLS ((foldername(name))[1] = uid).
export async function uploadPhoto(file) {
  const u = requireUser();
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${u.id}/${crypto.randomUUID()}.${ext}`;
  const { error } = await client().storage.from(BUCKET).upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  return path; // stored on the entry; display uses signed URLs only
}

// Short-lived signed URL for the OWNER's own viewing (thumbnails).
export async function signedPhotoUrl(photoPath, expiresInSeconds = 3600) {
  const { data, error } = await client().storage.from(BUCKET).createSignedUrl(photoPath, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}

// Feed photo URLs: short TTL because issuance is the authorization point.
// Issuance is gated by can_view_photo(); anyone holding the URL can use it
// until expiry, including after access is revoked.
export async function feedPhotoUrl(photoPath) {
  const { data, error } = await client().storage.from(BUCKET).createSignedUrl(photoPath, FEED_PHOTO_TTL);
  if (error) throw error;
  return data.signedUrl;
}

export async function saveEntry({ title, photoPath = null, ingredients = null, steps = null, macros = null }) {
  const u = requireUser();
  const { data, error } = await client()
    .from('cookbook_entries')
    .insert({ user_id: u.id, title, photo_path: photoPath, ingredients, steps, macros })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function listEntries() {
  const { data, error } = await client()
    .from('cookbook_entries')
    .select('id,title,photo_path,ingredients,steps,macros,created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Build the explicit snapshot a post will carry. Only fields listed here are
// published - anything else on the entry (or added later) stays private.
export function buildPostPayload(entry, { includePhoto = false, authorName = null } = {}) {
  const payload = {
    title: entry.title,
    author_name: authorName,
    ingredients: entry.ingredients ?? null,
    steps: entry.steps ?? null,
    macros: entry.macros ?? null,
  };
  if (includePhoto && entry.photo_path) payload.photo_path = entry.photo_path;
  return payload;
}

async function myDisplayName() {
  const u = requireUser();
  const { data } = await client().from('profiles').select('display_name').eq('id', u.id).single();
  return data?.display_name || u.email?.split('@')[0] || 'Someone';
}

// Freeze a photo for a post: copy the entry's object to a one-off shared/
// path. The copy's uuid is unique per publish, so no later upload can land on
// the same path and the post's snapshot is stable even if the entry's own
// photo is replaced or deleted.
async function freezePhotoForPost(uid, sourcePath) {
  const ext = (sourcePath.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const sharedPath = `${uid}/shared/${crypto.randomUUID()}.${ext}`;
  const { error } = await client().storage.from(BUCKET).copy(sourcePath, sharedPath);
  if (error) throw error;
  return sharedPath;
}

// Explicit publish: the caller chose the entry AND the audience.
export async function publishEntry(entry, audience, caption = '') {
  const u = requireUser();
  if (!['me', 'family', 'friends', 'public'].includes(audience)) throw new Error('Unknown audience');
  const payload = buildPostPayload(entry, { includePhoto: audience !== 'me', authorName: await myDisplayName() });
  if (payload.photo_path) payload.photo_path = await freezePhotoForPost(u.id, entry.photo_path);
  const { data, error } = await client()
    .from('posts')
    .insert({ author: u.id, cookbook_entry_id: entry.id, caption, audience, payload })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

// Feed: server-side RLS already filters to what this user may read; select only
// post rows (payload snapshots), never the source entries. Posts I hid are
// filtered out client-side from my own post_hides rows.
export async function readFeed({ limit = 50 } = {}) {
  const c = client();
  const [{ data, error }, { data: hides }] = await Promise.all([
    c.from('posts')
      .select('id,author,caption,audience,payload,created_at')
      .eq('hidden', false)
      .order('created_at', { ascending: false })
      .limit(limit),
    c.from('post_hides').select('post_id'),
  ]);
  if (error) throw error;
  const hidden = new Set((hides || []).map((h) => h.post_id));
  return (data || []).filter((p) => !hidden.has(p.id));
}

export async function unpublish(postId) {
  const c = client();
  // Read first so the frozen shared/ photo copy can be deleted too. Stage-5
  // storage policy cp_delete_shared_orphan lets the owner permanently delete a
  // shared/ copy once no live post references it - which deleting the post
  // above just achieved. If the remove fails, the orphan stays inaccessible to
  // non-owners (can_view_photo requires a live post) and a later
  // cleanupOrphanedSharedPhotos() sweep removes it.
  const { data: post } = await c.from('posts').select('payload').eq('id', postId).single();
  const { error } = await c.from('posts').delete().eq('id', postId);
  if (error) throw error;
  const path = post?.payload?.photo_path;
  if (path && path.includes('/shared/')) {
    try { await c.storage.from(BUCKET).remove([path]); } catch { /* swept later */ }
  }
}

// Garbage cleanup: permanently delete this owner's shared/ photo copies that
// no live post references. Data-layer route only (no UI menu); restricted to
// the owner's own folder by the storage policy.
export async function cleanupOrphanedSharedPhotos() {
  const u = requireUser();
  const c = client();
  const prefix = `${u.id}/shared`;
  const { data: objs, error } = await c.storage.from(BUCKET).list(prefix, { limit: 1000 });
  if (error) throw error;
  if (!objs?.length) return 0;
  // Hidden posts count as references: hiding is reversible, so their photos
  // must survive the sweep (mirrors is_deletable_shared_photo).
  const { data: posts } = await c.from('posts').select('payload').eq('author', u.id);
  const referenced = new Set((posts || []).map((p) => p.payload?.photo_path).filter(Boolean));
  const orphans = objs.map((o) => `${prefix}/${o.name}`).filter((p) => !referenced.has(p));
  if (!orphans.length) return 0;
  const { error: delErr } = await c.storage.from(BUCKET).remove(orphans);
  if (delErr) throw delErr;
  return orphans.length;
}

export async function hidePost(postId) {
  const u = requireUser();
  const { error } = await client().from('post_hides').insert({ post_id: postId, user_id: u.id });
  if (error) throw error;
}

// Flag someone else's post. One report per post per user (unique constraint).
export async function reportPost(postId, reason = null) {
  const u = requireUser();
  const { error } = await client().from('post_reports').insert({ post_id: postId, reporter: u.id, reason });
  if (error) throw error;
}

// ---------- People: household ----------
export async function listMyHousehold() {
  const u = requireUser();
  const c = client();
  // RLS lets members read ALL members of their household - filter to my own
  // row or a co-member's role leaks into myRole.
  const { data: mems, error } = await c.from('household_members').select('household_id, role').eq('user_id', u.id);
  if (error) throw error;
  if (!mems?.length) return null;
  const householdId = mems[0].household_id; // v1: first household only
  const { data: household } = await c.from('households').select('id,created_by').eq('id', householdId).single();
  const { data: members } = await c.from('household_members').select('user_id, role').eq('household_id', householdId);
  const ids = (members || []).map((m) => m.user_id);
  const { data: profiles } = await c.from('profiles').select('id,display_name').in('id', ids.length ? ids : ['00000000-0000-0000-0000-000000000000']);
  const names = new Map((profiles || []).map((p) => [p.id, p.display_name]));
  return {
    id: householdId,
    myRole: mems[0].role,
    createdBy: household?.created_by,
    members: (members || []).map((m) => ({ ...m, name: names.get(m.user_id) || 'Member' })),
  };
}

export async function createHousehold() {
  const u = requireUser();
  const c = client();
  const { data: h, error } = await c.from('households').insert({ created_by: u.id }).select('id').single();
  if (error) throw error;
  const { error: mErr } = await c.from('household_members').insert({ household_id: h.id, user_id: u.id, role: 'owner', added_by: u.id });
  if (mErr) throw mErr;
  return h.id;
}

export async function inviteToHousehold(householdId, email) {
  const u = requireUser();
  const { error } = await client().from('household_invites').insert({ household_id: householdId, invited_email: email.trim().toLowerCase(), invited_by: u.id });
  if (error) throw error;
}

export async function listMyInvites() {
  // RLS lets the invitee read their own invites AND the owner read household
  // invites; keep only ones addressed to my email so owners don't see their
  // own outgoing invites here.
  const u = requireUser();
  const { data, error } = await client().from('household_invites').select('id, household_id, invited_email, status, expires_at').eq('status', 'pending');
  if (error) throw error;
  const mine = (u.email || '').toLowerCase();
  return (data || []).filter((i) => (i.invited_email || '').toLowerCase() === mine);
}

export async function acceptInvite(inviteId) {
  const { error } = await client().rpc('accept_household_invite', { invite_id: inviteId });
  if (error) throw error;
}

export async function declineInvite(inviteId) {
  // Invitees can only read, not update, so declining = ignoring; owner can revoke.
  // Kept explicit so the UI copy stays honest.
  throw new Error('Ignore unwanted invites - they expire on their own.');
}

export async function leaveHousehold(householdId) {
  const u = requireUser();
  const { error } = await client().from('household_members').delete().eq('household_id', householdId).eq('user_id', u.id);
  if (error) throw error;
}

export async function removeHouseholdMember(householdId, userId) {
  const { error } = await client().from('household_members').delete().eq('household_id', householdId).eq('user_id', userId);
  if (error) throw error;
}

// ---------- People: friends ----------
// Opaque friend request: the response is identical whether or not the email
// has an account, so this cannot be used to probe who is signed up. The
// server creates a pending link only on a real match; the recipient accepts
// or declines. (Replaces the exact-email lookup, removed in review.)
export async function requestFriendByEmail(email) {
  const { error } = await client().rpc('request_friend_by_email', { req_email: email.trim().toLowerCase() });
  if (error) throw error;
}

export async function listFriendLinks() {
  const { data, error } = await client().from('friend_links').select('id, requester, addressee, status, created_at');
  if (error) throw error;
  const links = data || [];
  const ids = [...new Set(links.flatMap((l) => [l.requester, l.addressee]))];
  let names = new Map();
  if (ids.length) {
    // Profiles are only readable for self + household co-members, so friend
    // names may be unavailable here; the UI falls back to "Friend".
    const { data: profiles } = await client().from('profiles').select('id,display_name').in('id', ids);
    names = new Map((profiles || []).map((p) => [p.id, p.display_name]));
  }
  return links.map((l) => ({ ...l, requester_name: names.get(l.requester) || null, addressee_name: names.get(l.addressee) || null }));
}

export async function respondFriendRequest(linkId, accept) {
  const { error } = await client().from('friend_links').update({ status: accept ? 'accepted' : 'declined' }).eq('id', linkId);
  if (error) throw error;
}

export async function endFriendLink(linkId) {
  // Covers requester revoking a pending request and either party unfriending.
  const { error } = await client().from('friend_links').update({ status: 'revoked' }).eq('id', linkId);
  if (error) throw error;
}
