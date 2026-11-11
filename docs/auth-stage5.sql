-- Two Plates auth + privacy schema, STAGE 5 (review: authorized permanent
-- deletion of frozen shared/ photos so immutability does not become an
-- indefinite retention burden). Stages 1-4 must already be applied.
--
-- Design: shared/ copies stay write-once (stage 4) while a live post
-- references them. Once the last referencing post is deleted (or hidden), the
-- copy is an orphan and the OWNER - and only the owner - may permanently
-- delete it through the normal Storage API (which removes the underlying
-- bytes, not just the row). unpublish() calls this immediately; a client
-- sweep (cleanupOrphanedSharedPhotos) covers any leftovers. No long-lived
-- orphans, no owner-only menu required.

-- ============ 1. Orphan test helper (definer: reads posts without RLS recursion)
-- A copy counts as referenced while ANY post row points at it - including a
-- hidden one: hiding is reversible moderation, so a hidden post's photo must
-- survive or an unhide would revive a post with a silently missing image.
-- (Serving is separate: can_view_photo still refuses hidden posts.)
create or replace function public.is_deletable_shared_photo(object_name text) returns boolean
language sql stable security definer set search_path = public, storage as
$$
  select (storage.foldername(object_name))[1] = auth.uid()::text
     and (storage.foldername(object_name))[2] = 'shared'
     and not exists (
           select 1 from public.posts p
           where p.payload ->> 'photo_path' = object_name)
$$;
revoke all on function public.is_deletable_shared_photo(text) from public, anon;
grant execute on function public.is_deletable_shared_photo(text) to authenticated;

-- ============ 2. Owner delete of orphaned shared copies ============
-- Complements stage 4's cp_delete_own (which excludes shared/ entirely).
drop policy if exists cp_delete_shared_orphan on storage.objects;
create policy cp_delete_shared_orphan on storage.objects
  for delete to authenticated
  using (bucket_id = 'cookbook-photos'
         and public.is_deletable_shared_photo(name));

-- select pg_notify('pgrst', 'reload schema');
