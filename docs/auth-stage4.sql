-- Two Plates auth + privacy schema, STAGE 4 (review: snapshot immutability by
-- enforcement, not just unique naming). Stages 1-3 must already be applied.

-- ============ 1. Anti-forgery binding in can_view_photo ============
-- A post only authorizes photo access when the photo object lives in the POST
-- AUTHOR's own storage folder. Without this, a user could publish a public post
-- whose payload references someone else's photo path and thereby grant every
-- signed-in user read access to that photo.
create or replace function public.can_view_photo(object_name text) returns boolean
language sql stable security definer set search_path = public, storage as
$$
  select
    (storage.foldername(object_name))[1] = auth.uid()::text
    or exists (
      select 1 from public.posts p
      where p.payload ->> 'photo_path' = object_name
        and (storage.foldername(object_name))[1] = p.author::text
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

-- ============ 2. Frozen shared/ copies are write-once ============
-- The publish flow copies the entry photo to <uid>/shared/<uuid>.<ext> and the
-- post references that copy. Owners keep full update/delete over their own
-- NON-shared paths (entry photos), but shared/ objects can neither be
-- overwritten nor deleted by the owner, so an old post's photo cannot be
-- mutated or swapped after the fact. Unpublish therefore does NOT delete the
-- frozen copy: an orphan left behind is inaccessible to non-owners because
-- can_view_photo requires a live, unhidden post that references the path.
-- (Owner can still read their own orphan - it is their photo.)
drop policy cp_update_own on storage.objects;
create policy cp_update_own on storage.objects
  for update to authenticated
  using (bucket_id = 'cookbook-photos'
         and (storage.foldername(name))[1] = auth.uid()::text
         and ((storage.foldername(name))[2] is distinct from 'shared'))
  with check (bucket_id = 'cookbook-photos'
         and (storage.foldername(name))[1] = auth.uid()::text
         and ((storage.foldername(name))[2] is distinct from 'shared'));
drop policy cp_delete_own on storage.objects;
create policy cp_delete_own on storage.objects
  for delete to authenticated
  using (bucket_id = 'cookbook-photos'
         and (storage.foldername(name))[1] = auth.uid()::text
         and ((storage.foldername(name))[2] is distinct from 'shared'));

-- PostgREST caches function bodies only per connection; no signature changed,
-- but reload anyway for safety:
--   select pg_notify('pgrst', 'reload schema');
