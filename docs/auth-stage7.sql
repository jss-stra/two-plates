-- Stage 7: a member leaving or being removed revokes their pending invites
-- for that household, server-side. Without this, a removed member could
-- rejoin through an invite sent before the removal - the invitee's consent
-- is not the owner's authorization after removal. A deliberate re-invite
-- afterwards still works, because it creates a new pending row.
-- Clients never learn member emails; this trigger runs as definer, so it can
-- match the departed member's auth email without exposing it to anyone.
create or replace function public.revoke_invites_on_member_delete() returns trigger
language plpgsql security definer set search_path = public, auth as
$$
begin
  update public.household_invites
     set status = 'revoked'
   where household_id = old.household_id
     and status = 'pending'
     and invited_email = (select email from auth.users where id = old.user_id);
  return old;
end
$$;
revoke all on function public.revoke_invites_on_member_delete() from public, anon;
drop trigger if exists household_member_delete_revoke on public.household_members;
create trigger household_member_delete_revoke after delete on public.household_members
  for each row execute function public.revoke_invites_on_member_delete();
