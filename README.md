# Qadam Footwear — Shoe Store Website

A complete, professional e-commerce website for a men's & women's shoe
business, with a secure owner dashboard and WhatsApp ordering. Built with
**Next.js** (website) + **Supabase** (database, image/video storage, and
admin login) — both free to run for a small business.

No coding is required after setup. Everything (products, images, videos,
WhatsApp number) is managed from the `/admin` dashboard.

---

## 1. What's inside (project structure)

```
shoe-store/
├── src/
│   ├── app/
│   │   ├── page.js                  Home page
│   │   ├── men/page.js              Men's shoes grid
│   │   ├── women/page.js            Women's shoes grid
│   │   ├── product/[id]/page.js     Single product page
│   │   └── admin/                   Owner-only dashboard (login required)
│   │       ├── login/page.js
│   │       ├── page.js              Dashboard overview
│   │       ├── products/            Product list, add, edit
│   │       └── settings/            WhatsApp number, banner, business info
│   ├── components/                  Header, Footer, ProductCard, etc.
│   ├── lib/                         Supabase connection helpers
│   └── middleware.js                Blocks customers from /admin pages
├── supabase/schema.sql              Database setup script (run once)
├── .env.local.example               Where your Supabase keys go
└── package.json
```

You do not need to edit any of this code. You only need to:
1. Create a free Supabase project (database + storage + login).
2. Paste two keys into a file.
3. Deploy to Vercel (free hosting).

---

## 2. One-time setup

### Step A — Create your free Supabase project

1. Go to https://supabase.com and sign up (free).
2. Click **New Project**. Pick any name and password (save the password
   somewhere safe) and region closest to Pakistan (e.g. Singapore).
3. Wait ~2 minutes for the project to finish setting up.

### Step B — Set up the database

1. In your Supabase project, open **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open the file `supabase/schema.sql` from this project, copy everything
   in it, and paste it into the SQL Editor.
4. Click **Run**. You should see "Success. No rows returned."

This automatically creates:
- A `products` table (for all your shoes)
- A `settings` table (WhatsApp number, banner, business info)
- Two storage folders: `product-media` (images/videos) and `site-assets`
  (banner/promo images)
- Security rules so customers can only *view* products, and only a logged
  in owner can add/edit/delete anything.

### Step C — Create your admin (owner) login

1. In Supabase, open **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter the email and password you (the owner) will log in with.
4. Tick **Auto Confirm User**, then click **Create user**.

This is the only account that can access `/admin`. You can add more staff
logins later the same way.

### Step D — Connect the website to Supabase

1. In Supabase, go to **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public** key.
3. In this project folder, copy `.env.local.example` to a new file named
   `.env.local`.
4. Paste your values in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

### Step E — Run it on your computer (to test before going live)

You'll need [Node.js](https://nodejs.org) installed (free, official site).
Then, in a terminal, inside the `shoe-store` folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see your store, and
http://localhost:3000/admin/login to log in as the owner.

---

## 3. How to use the admin dashboard

Go to `yourwebsite.com/admin/login` (there's also a small "Store Login"
link at the bottom of every page) and log in with the email/password from
Step C.

### Add a product
1. Go to **Add Product** in the sidebar.
2. Fill in name, category (Men/Women), price, sizes, colors, description.
3. Upload one or more images (JPG/PNG/WEBP). The first image becomes the
   product's cover photo.
4. Optionally upload a product video — **must be 10 seconds or shorter**;
   the site will warn you and reject longer videos automatically.
5. Tick **New Arrival** and/or **Mark as Sale** (with a sale price) if
   relevant.
6. Click **Add Product** — it appears on the live site immediately.

### Edit or change images on a product
Go to **Products** → click **Edit** next to any product. You can add more
images, remove existing ones (click the × on a photo), replace the video,
or change any detail, then **Save Changes**.

### Remove a sold-out product
Go to **Products** → click **Delete** next to the item → confirm. It's
removed from the site immediately. (Tip: if you just want to pause it
temporarily instead of deleting it, click **Hide** instead — it stays in
your dashboard but disappears from the customer site until you **Unhide**
it.)

### Change your WhatsApp number
Go to **Settings** → update **WhatsApp Number** (format: country code +
number, no spaces or dashes, e.g. `923001234567` for `0300-1234567`) →
**Save Settings**. Every "Order on WhatsApp" button on the site updates
instantly.

### Change the homepage banner or business info
Also in **Settings** — upload a new banner image, edit your business name,
or update your store address.

---

## 4. How customers order

Every product has an **Order on WhatsApp** button. Tapping it opens
WhatsApp with a message already filled in:

```
Assalam o Alaikum, I want to order:
Product: [Product Name]
Price: [Price]
Size: [Selected Size]
Color: [Selected Color]
```

Customers never see admin controls and cannot reach `/admin` pages without
logging in — even if they type the URL directly.

---

## 5. Deploying for free

**Frontend hosting:** [Vercel](https://vercel.com) (free tier)
**Database + auth + file storage:** [Supabase](https://supabase.com) (free tier)

### Steps
1. Push this project to a GitHub repository (create a free GitHub account
   at github.com if you don't have one, create a new repository, and
   upload this folder — GitHub's website lets you drag-and-drop files, or
   use GitHub Desktop if you prefer a visual tool).
2. Go to https://vercel.com, sign up with your GitHub account (free).
3. Click **Add New** → **Project**, and select your GitHub repository.
4. Vercel will detect it's a Next.js project automatically. Before
   deploying, click **Environment Variables** and add the same two values
   from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. In about a minute, you'll get a free live URL like
   `your-store.vercel.app`.
6. (Optional) In Vercel's project settings you can connect a custom domain
   name later (domain names themselves are usually paid, but the hosting
   stays free).

Your site is now live, and you manage everything from `/admin` — no code
edits, no redeploying needed when you add or change products.

### Free tier limits (fine for a small-to-medium store)
- **Supabase free tier:** 500MB database, 1GB file storage, 50,000 monthly
  active users — enough for thousands of products and steady traffic.
- **Vercel free tier:** generous bandwidth for personal/small business
  sites.

If you ever outgrow these, both platforms have affordable paid plans you
can upgrade to without changing any code.

---

## 6. Troubleshooting

- **"Incorrect email or password" on admin login** — double check the
  user was created in Supabase Authentication with **Auto Confirm User**
  ticked.
- **Products not showing on the live site** — make sure the product isn't
  marked **Hidden**, and that your `.env.local` (or Vercel environment
  variables) match your Supabase project exactly.
- **Video upload rejected** — trim the clip to 10 seconds or under before
  uploading (any phone video editor or CapCut can do this for free).
- **Images not loading after deploying** — confirm you ran the full
  `supabase/schema.sql` script, which sets the storage buckets to public.
