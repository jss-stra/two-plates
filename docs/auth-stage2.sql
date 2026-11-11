-- Two Plates auth + privacy schema, STAGE 2 (new objects + targeted policy fixes)
-- Stage 1 (docs/auth-stage1.sql) must already be applied. No destructive statements
-- beyond the two policy replacements noted inline.

-- ============ 1. Non-owner photo authorization ============
-- Mirrors posts_read_by_audience for photos referenced by a post's payload
-- snapshot. SECURITY DEFINER so it can read posts/friend_links without RLS
-- recursion; the audience logic is enforced explicitly inside. auth.uid() still
-- returns the invoking user. If the posts read policy changes, change this too.
-- NOTE (surfaced in review): this gates NEW signed-url issuance only. A signed
-- URL already issued stays usable by whoever holds it until it expires, so the
-- app issues short-TTL URLs and access loss takes effect within that TTL.
create or replace function public.can_view_photo(object_name text) returns boolean
language sql stable security definer set search_path = public, storage as
$$
  select
    (storage.foldername(object_name))[1] = auth.uid()::text
    or exists (
      select 1 from public.posts p
      where p.payload ->> 'photo_path' = object_name
        and not p.hidden
        and (
          p.audience = 'public'
          or (p.audience = 'family' and public.shares_household_with(p.author))
          or (p.audience = 'friends' and exists (
                select 1 from public.friend_links f
                where f.status = 'accepted'
                  and ((f.requester = p.author and f.addressee = auth.uid())
                    or (f.addressee = p.author and f.requester = auth.uid()))))
        )
    )
$$;
revoke all on function public.can_view_photo(text) from public, anon;
grant execute on function public.can_view_photo(text) to authenticated;

-- Non-owner read on photo objects, gated by the function above. Owner policies
-- from stage 1 (cp_select_own etc.) are unchanged.
create policy cp_select_shared on storage.objects
  for select to authenticated
  using (bucket_id = 'cookbook-photos' and public.can_view_photo(name));

-- ============ 2. Household invite acceptance (atomic) ============
-- The invitee can read their own invite (hi_invitee_reads) but cannot add
-- themselves as a member under the stage-1 member policies; this RPC validates
-- and does both steps as the definer.
create or replace function public.accept_household_invite(invite_id uuid) returns void
language plpgsql security definer set search_path = public as
$$
declare inv record;
begin
  select * into inv from public.household_invites where id = invite_id;
  if not found then raise exception 'invite not found'; end if;
  if inv.invited_email <> (auth.jwt() ->> 'email') then raise exception 'this invite is for a different email'; end if;
  if inv.status <> 'pending' or inv.expires_at < now() then raise exception 'invite is no longer usable'; end if;
  insert into public.household_members (household_id, user_id, role, added_by)
    values (inv.household_id, auth.uid(), 'member', inv.invited_by)
    on conflict do nothing;
  update public.household_invites set status = 'accepted' where id = invite_id;
end
$$;
revoke all on function public.accept_household_invite(uuid) from public, anon;
grant execute on function public.accept_household_invite(uuid) to authenticated;

-- ============ 3. Join-request approval (atomic) ============
-- Owner approves a request: membership insert + status flip in one step.
create or replace function public.approve_join_request(request_id uuid) returns void
language plpgsql security definer set search_path = public as
$$
declare jr record;
begin
  select * into jr from public.household_join_requests where id = request_id;
  if not found then raise exception 'request not found'; end if;
  if not public.is_household_owner(jr.household_id) then raise exception 'only the household owner can approve'; end if;
  if jr.status <> 'pending' then raise exception 'request already handled'; end if;
  insert into public.household_members (household_id, user_id, role, added_by)
    values (jr.household_id, jr.requester, 'member', auth.uid())
    on conflict do nothing;
  update public.household_join_requests set status = 'approved' where id = request_id;
end
$$;
revoke all on function public.approve_join_request(uuid) from public, anon;
grant execute on function public.approve_join_request(uuid) to authenticated;

-- ============ 4. Exact-email lookup for friend requests ============
-- Returns id + display name for an EXACT email match, nothing otherwise.
-- Tradeoff (surfaced in review): this lets a signed-in user check whether a
-- specific email has an account. No partial search, no listing.
-- NOTE: the parameter must NOT be named `email` - in a SQL-language function an
-- unqualified `email` resolves to the column, making the predicate always true
-- and returning an ARBITRARY user (found in fixture testing: a lookup for a
-- fixture address returned the real owner's profile). Parameter is lookup_email.
drop function if exists public.find_user_by_email(text);
create function public.find_user_by_email(lookup_email text)
returns table (id uuid, display_name text)
language sql stable security definer set search_path = public, auth as
$$
  select p.id, p.display_name
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(u.email) = lower(lookup_email)
  limit 1
$$;
revoke all on function public.find_user_by_email(text) from public, anon;
grant execute on function public.find_user_by_email(text) to authenticated;

-- ============ 5. Friend-link update policy fix ============
-- Stage 1's fl_addressee_responds had a USING clause that also matched the
-- requester only when status was already 'revoked', which made requester
-- revocation impossible. Split into two explicit policies.
drop policy fl_addressee_responds on public.friend_links;
create policy fl_addressee_responds on public.friend_links
  for update to authenticated
  using (addressee = auth.uid() and status = 'pending')
  with check (addressee = auth.uid() and status in ('accepted', 'declined'));
create policy fl_requester_revokes on public.friend_links
  for update to authenticated
  using (requester = auth.uid() and status = 'pending')
  with check (requester = auth.uid() and status = 'revoked');

-- ============ 6. Household invite revocation hygiene ============
-- Owners manage invites under hi_owner_manages (stage 1) - includes update to
-- 'revoked'. Nothing new needed; noted so the review knows it was considered.

-- ============ 7. Unfriend + household leave/removal (stage 2b) ============
-- Stage 1/2 had no way to end an accepted friendship or leave a household.
create policy fl_participant_unfriends on public.friend_links
  for update to authenticated
  using ((requester = auth.uid() or addressee = auth.uid()) and status = 'accepted')
  with check ((requester = auth.uid() or addressee = auth.uid()) and status = 'revoked');
create policy hm_self_leaves on public.household_members
  for delete to authenticated
  using (user_id = auth.uid() and role <> 'owner');
create policy hm_owner_removes on public.household_members
  for delete to authenticated
  using (public.is_household_owner(household_id) and user_id <> auth.uid());

-- ============ 8. Friend display names (stage 2c) ============
-- Profiles carry id + display_name only. Accepted/pending friend links may read
-- the other side's name so the people UI can show who a link is with.
create policy profiles_read_friends on public.profiles
  for select to authenticated
  using (exists (select 1 from public.friend_links f
    where f.status in ('accepted','pending')
      and ((f.requester = profiles.id and f.addressee = auth.uid())
        or (f.addressee = profiles.id and f.requester = auth.uid()))));
