// Google sign-in for Two Plates accounts: private cookbook, household sharing and
// the friends/public feed. The key below is the public publishable key (safe to
// ship); row-level security on the server decides what each signed-in user can
// read or write. Auth is optional - the whole app keeps working signed out.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';

const SUPABASE_URL = 'https://ggqfapcmxxhlgntmejgy.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_1ORW_K2uTBuc72s_O7kFdg_Exdbddvu';

let client = null;
let user = null;
let ready = false;
const listeners = new Set();

export const onAuth = (fn) => listeners.add(fn);
export const authUser = () => user;
export const authReady = () => ready;
export const authClient = () => client;

function setUser(u) {
  const changed = (u?.id || null) !== (user?.id || null);
  user = u;
  if (changed) listeners.forEach((fn) => fn(user));
}

export async function initAuth() {
  try {
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true },
    });
    client.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    const { data } = await client.auth.getSession();
    setUser(data.session?.user || null);
  } catch (e) {
    // Auth unavailable (offline or CDN blocked): the app stays usable signed out.
  }
  ready = true;
  listeners.forEach((fn) => fn(user));
}

export async function signInWithGoogle() {
  if (!client) throw new Error('Sign-in is unavailable right now. Check your connection and try again.');
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });
  if (error) throw error;
}

export async function signOut() {
  if (!client) return;
  await client.auth.signOut();
  setUser(null);
}
