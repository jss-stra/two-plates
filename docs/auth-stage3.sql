-- Two Plates auth + privacy schema, STAGE 3 (review fixes)
-- Stage 1 + 2 must already be applied. Addressed here:
--  1. Exact-email probing removed: find_user_by_email is dropped and replaced
--     by an opaque request flow (generic response, no account-existence
--     disclosure; a pending link is created only if the email really matches
--     an account, and the recipient must accept).
--  2. Unused approve_join_request RPC dropped (attack surface with no UI).
--  3. Profile visibility tightened so a pending link lets the RECIPIENT read
--     the requester's name (needed to accept meaningfully) while the requester
--     reads nothing until acceptance (keeps the opaque request opaque).

-- ============ 1. Opaque friend request by email ============
drop function if exists public.find_user_by_email(text);

create or replace function public.request_friend_by_email(req_email text) returns void
language plpgsql security definer set search_path = public, auth as
$$
declare target uuid;
begin
  -- Always returns the same void result: no existence signal.
  select u.id into target from auth.users u where lower(u.email) = lower(req_email) limit 1;
  if target is null or target = auth.uid() then return; end if;
  -- Any existing link between the pair (either direction, any status): no-op,
  -- so a requester also cannot distinguish "already linked" from "no account".
  if exists (select 1 from public.friend_links f
             where (f.requester = auth.uid() and f.addressee = target)
                or (f.addressee = auth.uid() and f.requester = target)) then
    return;
  end if;
  insert into public.friend_links (requester, addressee, status)
    values (auth.uid(), target, 'pending');
end
$$;
revoke all on function public.request_friend_by_email(text) from public, anon;
grant execute on function public.request_friend_by_email(text) to authenticated;

-- ============ 2. Drop unused join-request approval RPC ============
drop function if exists public.approve_join_request(uuid);

-- ============ 3. Tighten profiles_read_friends ============
-- Accepted link: both sides read each other's name.
-- Pending link: only the addressee reads the requester's name; the requester
-- cannot read the addressee's profile until the request is accepted.
drop policy profiles_read_friends on public.profiles;
create policy profiles_read_friends on public.profiles
  for select to authenticated
  using (exists (select 1 from public.friend_links f
    where (f.requester = profiles.id or f.addressee = profiles.id)
      and (
        (f.status = 'accepted' and (f.requester = auth.uid() or f.addressee = auth.uid()))
        or (f.status = 'pending' and f.requester = profiles.id and f.addressee = auth.uid())
      )));

-- PostgREST caches RPC signatures. After applying this file, run:
--   select pg_notify('pgrst', 'reload schema');
