-- =========================================================
-- Shoe Store database schema for Supabase
-- Run this once in: Supabase Dashboard -> SQL Editor -> New query
-- =========================================================

-- 1. PRODUCTS TABLE
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('men', 'women')),
  price numeric not null,
  sale_price numeric,
  description text,
  sizes text[] default '{}',
  colors text[] default '{}',
  images text[] default '{}',
  video_url text,
  is_new_arrival boolean default false,
  is_sale boolean default false,
  is_hidden boolean default false,
  created_at timestamp with time zone default now()
);

-- 2. SITE SETTINGS TABLE (single row: business info + whatsapp number)
create table if not exists settings (
  id int primary key default 1,
  business_name text default 'Your Shoe Store',
  whatsapp_number text default '923000000000',
  address text default 'Main Sheikhupura-Sharkpur Road, Tehsil Ferozwala, District Sheikhupura, Punjab, Pakistan',
  hero_image_url text,
  promo_images text[] default '{}',
  constraint single_row check (id = 1)
);

insert into settings (id) values (1) on conflict (id) do nothing;

-- 3. ENABLE ROW LEVEL SECURITY
alter table products enable row level security;
alter table settings enable row level security;

-- 4. POLICIES
-- Everyone (including anonymous customers) can VIEW products that are not hidden.
create policy "Public can view visible products"
  on products for select
  using (is_hidden = false);

-- Only logged-in users (the admin) can insert/update/delete/view-all products.
create policy "Admin can manage all products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Everyone can read settings (needed to show WhatsApp number & banner).
create policy "Public can view settings"
  on settings for select
  using (true);

-- Only logged-in users (the admin) can update settings.
create policy "Admin can update settings"
  on settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. STORAGE BUCKETS (images & videos, both public-read)
insert into storage.buckets (id, name, public)
  values ('product-media', 'product-media', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('site-assets', 'site-assets', true)
  on conflict (id) do nothing;

-- Anyone can VIEW files in these buckets (so product images load on the site)
create policy "Public can view product media"
  on storage.objects for select
  using (bucket_id in ('product-media', 'site-assets'));

-- Only logged-in users (the admin) can upload/replace/delete files
create policy "Admin can upload product media"
  on storage.objects for insert
  with check (bucket_id in ('product-media', 'site-assets') and auth.role() = 'authenticated');

create policy "Admin can update product media"
  on storage.objects for update
  using (bucket_id in ('product-media', 'site-assets') and auth.role() = 'authenticated');

create policy "Admin can delete product media"
  on storage.objects for delete
  using (bucket_id in ('product-media', 'site-assets') and auth.role() = 'authenticated');
