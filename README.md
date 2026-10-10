# 🛡️ Smart Cover — Protect What Matters. Grow What's Yours.

> A modern, full-stack insurance platform built for Nigerian families who want clarity, security, and real returns from their financial cover.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://github.com/Ukezi-Ebenezer/Smart-cover)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.17-orange?style=flat-square)](https://tanstack.com/start)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📖 About

**Smart Cover** is a premium insurance advisory and policy management platform. It helps individuals and families in Nigeria find the right life, savings, and investment insurance plans — with full transparency on costs, payouts, and timelines.

The platform is built around the belief that insurance should be **human-first**: clear language, honest numbers, and a direct path to getting covered.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Homepage** | Animated hero with typed headline, rotating quote bar, and plan showcase |
| 📋 **Insurance Plans** | 7 curated plans — endowment, annuity, savings, car, family, investment & retirement |
| 📅 **Book a Call** | WhatsApp-linked consultation booking with advisor profile |
| 📊 **Visitor Analytics** | Real-time page visit and scroll-depth tracking via Supabase |
| 🔝 **Scroll Enhancements** | Global top progress bar and circular back-to-top button |
| 📱 **Fully Responsive** | Mobile-first layout with touch-friendly navigation and mobile drawer |
| ♿ **Accessible** | Reduced-motion support, semantic HTML, ARIA labels throughout |
| 🔐 **Secure** | HTTP security headers, RLS-enabled Supabase, no secrets in source |

---

## 🗂️ Insurance Plans Offered

1. **Flexible Endowment Plan** — Savings, investment & protection in one policy. From ₦1.8M/yr.
2. **Deferred Annuity** — Save today, earn guaranteed income at retirement.
3. **Immediate Annuity** — Convert a lump sum into monthly income for life.
4. **Investment Savings Plan** — Market-linked growth with a capital protection floor.
5. **Whole Life Plan** — Lifetime cover with a growing cash value component.
6. **Motor Insurance** — Third-party and comprehensive vehicle cover.
7. **Family Protection Plan** — Term life cover designed around family obligations.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) + [React 19](https://react.dev/) |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS v4 + Vanilla CSS |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Routing** | TanStack Router (file-based) |
| **Backend / DB** | [Supabase](https://supabase.com/) (PostgreSQL + RLS) |
| **Build Tool** | Vite 7 |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- A [Supabase](https://supabase.com) project (free tier works fine)

### Installation

```sh
# 1. Clone the repository
git clone https://github.com/Ukezi-Ebenezer/Smart-cover.git
cd Smart-cover

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase credentials in .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:8080**.

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
SUPABASE_PROJECT_ID=your_project_id
SUPABASE_URL=https://your_project_id.supabase.co
VITE_SUPABASE_URL=https://your_project_id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

> ⚠️ **Never commit your real `.env` file.** It is already in `.gitignore`.

---

## 🗄️ Database Setup (Supabase)

Run the following SQL in your Supabase **SQL Editor** to create the visitor tracking table:

```sql
CREATE TABLE IF NOT EXISTS page_visits (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID NOT NULL,
  page        TEXT NOT NULL,
  referrer    TEXT,
  max_scroll  NUMERIC DEFAULT 0,
  visited_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and updates (visitor tracking)
CREATE POLICY "Allow public insert" ON page_visits FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update" ON page_visits FOR UPDATE TO public USING (true);
CREATE POLICY "Allow public select" ON page_visits FOR SELECT TO public USING (true);
```

---

## 📁 Project Structure

```
smart-cover/
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── site-header.tsx  # Global navigation header
│   │   ├── site-footer.tsx  # Global footer
│   │   └── scroll-enhancements.tsx  # Progress bar & back-to-top
│   ├── hooks/
│   │   └── use-visitor-tracker.ts   # Supabase analytics hook
│   ├── integrations/supabase/       # Supabase client & auth
│   ├── lib/                 # Utilities and server config
│   ├── routes/
│   │   ├── __root.tsx       # App shell (header, footer, tracking)
│   │   ├── index.tsx        # Homepage
│   │   └── book.tsx         # Book a consultation page
│   ├── styles.css           # Global design system & animations
│   ├── router.tsx           # Router configuration
│   └── server.ts            # TanStack Start server entry
├── .env.example             # Safe environment variable template
├── .gitignore
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 🤝 Contact & Consultation

Want to get covered or learn more?

- 💬 **WhatsApp**: [Chat with an advisor](https://wa.link/mvnpxr)
- 📅 **Book a Call**: Visit the `/book` page on the site

---

## 📄 License

This project is privately maintained. All rights reserved © Smart Cover.
