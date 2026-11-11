-- Two Plates auth + privacy schema, STAGE 1 (new objects only)
-- meal_state and every existing table are untouched. No destructive statements.

-- ============ tables ============
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz default now()
);

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  legacy_code text unique,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists public.household_members (
  household_id uuid references public.households(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','member')),
  added_by uuid references auth.users(id),
  created_at timestamptz default now(),
  primary key (household_id, user_id)
);

create table if not exists public.household_join_requests (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  requester uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

create table if not exists public.friend_links (
  id uuid primary key default gen_random_uuid(),
  requester uuid references auth.users(id),
  addressee uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending','accepted','declined','revoked')),
  created_at timestamptz default now(),
  unique (requester, addressee)
);

create table if not exists public.cookbook_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  photo_path text,
  ingredients jsonb,
  steps jsonb,
  macros jsonb,
  created_at timestamptz default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references auth.users(id) on delete cascade,
  cookbook_entry_id uuid references public.cookbook_entries(id) on delete set null,
  caption text,
  audience text not null default 'me' check (audience in ('me','family','friends','public')),
  hidden boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists public.post_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  reporter uuid references auth.users(id),
  reason text,
  created_at timestamptz default now(),
  unique (post_id, reporter)
);

create table if not exists public.post_hides (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

create table if not exists public.household_invites (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  invited_email text not null,
  invited_by uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending','accepted','declined','revoked','expired')),
  created_at timestamptz default now(),
  expires_at timestamptz default now() + interval '7 days'
);

-- ============ helper functions (security definer + fixed search_path: no RLS recursion) ============
create or replace function public.is_household_member(h uuid) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from household_members where household_id = h and user_id = auth.uid()) $$;

create or replace function public.is_household_owner(h uuid) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from household_members where household_id = h and user_id = auth.uid() and role = 'owner') $$;

create or replace function public.shares_household_with(u uuid) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from household_members a join household_members b on b.household_id = a.household_id where a.user_id = u and b.user_id = auth.uid()) $$;

revoke all on function public.is_household_member(uuid) from public, anon;
revoke all on function public.is_household_owner(uuid) from public, anon;
revoke all on function public.shares_household_with(uuid) from public, anon;
grant execute on function public.is_household_member(uuid) to authenticated;
grant execute on function public.is_household_owner(uuid) to authenticated;
grant execute on function public.shares_household_with(uuid) to authenticated;

-- auto-create a profile on signup
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as
$$ begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ RLS ============
alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.household_join_requests enable row level security;
alter table public.friend_links enable row level security;
alter table public.cookbook_entries enable row level security;
alter table public.posts enable row level security;
alter table public.post_reports enable row level security;
alter table public.post_hides enable row level security;
alter table public.household_invites enable row level security;

-- profiles: self read/update; household co-members can read display names
create policy profiles_read_own on public.profiles
  for select to authenticated using (id = auth.uid());
create policy profiles_read_shared on public.profiles
  for select to authenticated using (public.shares_household_with(id));
create policy profiles_update_own on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- households: creator inserts; creator + members read; no client update/delete
create policy households_insert on public.households
  for insert to authenticated with check (created_by = auth.uid());
create policy households_read on public.households
  for select to authenticated using (created_by = auth.uid() or public.is_household_member(id));

-- household_members: members read their household; owners add; new-household creator adds self
create policy hm_read on public.household_members
  for select to authenticated using (public.is_household_member(household_id));
create policy hm_owner_adds on public.household_members
  for insert to authenticated with check (
    public.is_household_owner(household_id)
    or (user_id = auth.uid() and role = 'owner' and added_by = auth.uid()
        and exists (select 1 from public.households h
                    where h.id = household_id
                      and h.created_by = auth.uid() and h.legacy_code is null))
  );

-- join requests: requester creates; owner reviews; requester + owner read
create policy hjr_requester_creates on public.household_join_requests
  for insert to authenticated with check (requester = auth.uid());
create policy hjr_owner_reviews on public.household_join_requests
  for update to authenticated using (public.is_household_owner(household_id));
create policy hjr_read on public.household_join_requests
  for select to authenticated
  using (requester = auth.uid() or public.is_household_owner(household_id));

-- friend links: participants only
create policy fl_participants on public.friend_links
  for select to authenticated using (requester = auth.uid() or addressee = auth.uid());
create policy fl_requester_creates on public.friend_links
  for insert to authenticated with check (requester = auth.uid());
create policy fl_addressee_responds on public.friend_links
  for update to authenticated
  using (addressee = auth.uid() or (requester = auth.uid() and status = 'revoked'));

-- cookbook entries: owner full control; readable via a post the reader can already see
create policy ce_owner_all on public.cookbook_entries
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy ce_read_shared on public.cookbook_entries
  for select to authenticated
  using (exists (select 1 from public.posts p where p.cookbook_entry_id = cookbook_entries.id));

-- posts: author writes; audience enforced on read
create policy posts_insert_own on public.posts
  for insert to authenticated with check (author = auth.uid());
create policy posts_update_own on public.posts
  for update to authenticated using (author = auth.uid()) with check (author = auth.uid());
create policy posts_delete_own on public.posts
  for delete to authenticated using (author = auth.uid());
create policy posts_read_by_audience on public.posts
  for select to authenticated
  using (
    not hidden and (
      author = auth.uid()
      or (audience = 'family' and public.shares_household_with(posts.author))
      or (audience in ('friends','public') and exists (
            select 1 from public.friend_links f
            where f.status = 'accepted'
              and ((f.requester = posts.author and f.addressee = auth.uid())
                or (f.addressee = posts.author and f.requester = auth.uid()))))
      or audience = 'public'
    )
  );

-- reports: create only, no client read
create policy pr_create on public.post_reports
  for insert to authenticated with check (reporter = auth.uid());

-- hides: own rows only
create policy ph_own on public.post_hides
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- invites: owner manages; invitee reads own (email from JWT, not auth.users)
create policy hi_owner_manages on public.household_invites
  for all to authenticated
  using (public.is_household_owner(household_id))
  with check (public.is_household_owner(household_id));
create policy hi_invitee_reads on public.household_invites
  for select to authenticated
  using (invited_email = (auth.jwt() ->> 'email'));

-- ============ indexes ============
create index if not exists idx_hm_user on public.household_members (user_id);
create index if not exists idx_posts_author on public.posts (author, created_at desc);
create index if not exists idx_posts_entry on public.posts (cookbook_entry_id);
create index if not exists idx_friend_links_pair on public.friend_links (requester, addressee);
create index if not exists idx_hjr_household on public.household_join_requests (household_id);
create index if not exists idx_ce_user on public.cookbook_entries (user_id);

-- ============ amendment 2026-11-11: explicit publish snapshots ============
-- Review finding: sharing entries through posts exposed the whole mutable private
-- row. Posts now carry an immutable payload snapshot; entries stay owner-only.
alter table public.posts add column if not exists payload jsonb;
comment on column public.posts.payload is 'Immutable snapshot published with the post (title, ingredients, steps, macros, photo). Cookbook entries stay private; the feed reads this snapshot, never the entry.';
drop policy ce_read_shared on public.cookbook_entries;

-- authors always see their own posts (moderation UX)
drop policy posts_read_by_audience on public.posts;
create policy posts_read_by_audience on public.posts
  for select to authenticated
  using (
    author = auth.uid()
    or (not hidden and (
      (audience = 'family' and public.shares_household_with(posts.author))
      or (audience in ('friends','public') and exists (
            select 1 from public.friend_links f
            where f.status = 'accepted'
              and ((f.requester = posts.author and f.addressee = auth.uid())
                or (f.addressee = posts.author and f.requester = auth.uid()))))
      or audience = 'public'
    ))
  );

-- ============ private photo storage ============
insert into storage.buckets (id, name, public) values ('cookbook-photos', 'cookbook-photos', false)
on conflict (id) do nothing;
create policy cp_insert_own on storage.objects
  for insert to authenticated
  with check (bucket_id = 'cookbook-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy cp_select_own on storage.objects
  for select to authenticated
  using (bucket_id = 'cookbook-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy cp_update_own on storage.objects
  for update to authenticated
  using (bucket_id = 'cookbook-photos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'cookbook-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy cp_delete_own on storage.objects
  for delete to authenticated
  using (bucket_id = 'cookbook-photos' and (storage.foldername(name))[1] = auth.uid()::text);
