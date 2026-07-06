# Rynex Security — Website

**Production site for Rynex Security** (rynexsecurity.com) — a premium cybersecurity advisory and red team services platform. Built on the **Lovable modern stack**: **TanStack Start v1** (React 19 + Vite 7) with **Tailwind CSS v4**, **shadcn/ui**, and **Supabase** for lead capture and backend services.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Overview](#project-overview)
3. [Prerequisites](#prerequisites)
4. [Local Development Setup](#local-development-setup)
5. [Project Structure](#project-structure)
6. [Environment Configuration](#environment-configuration)
7. [Database Setup](#database-setup)
8. [Development Workflow](#development-workflow)
9. [Building for Production](#building-for-production)
10. [Deployment to Production](#deployment-to-production)
11. [Design System & Theming](#design-system--theming)
12. [API & Server Functions](#api--server-functions)
13. [Monitoring & Error Handling](#monitoring--error-handling)
14. [Performance Optimization](#performance-optimization)
15. [Troubleshooting](#troubleshooting)

---

## Tech Stack

### Frontend
- **React 19** — Latest React with hooks and server components support
- **TanStack Start v1** — Full-stack React framework with file-based routing
- **TanStack Router v1** — Type-safe routing with data loader support
- **Vite 7** — Lightning-fast build tool and dev server
- **Tailwind CSS v4** — Utility-first CSS framework
- **shadcn/ui** — High-quality React component library
- **TypeScript** — Type-safe JavaScript

### Backend & Database
- **Supabase** — PostgreSQL + Auth + Real-time API (Lovable Cloud managed)
- **Cloudflare Workers** — Edge computing runtime for deployment
- **Node.js runtime** (via `nodejs_compat` in Cloudflare)

### Development & Quality
- **ESLint** — Code linting and style consistency
- **Prettier** — Code formatting
- **Zod** — TypeScript-first schema validation
- **React Hook Form** — Performant form management
- **React Query** — Server state management

### UI & Design
- **Lucide React** — Icon library
- **Recharts** — Charting library
- **Sonner** — Toast notifications
- **Radix UI** — Headless component primitives

---

## Project Overview

### Core Features
1. **Public Marketing Site** — Multi-page site showcasing Rynex services
2. **RynexScore** — Free passive security grader (DNS, SPF, DMARC, TLS scans)
3. **Lead Capture** — Contact forms integrated with Supabase
4. **Service Pages** — Pentest, Red Team, Advisory, Cloud Security, Code Review
5. **Blog/Case Studies** — Client success stories (anonymized)
6. **Admin Portal** (Phase 3) — Client dashboard placeholder

### Key Services Highlighted
- **Red Teaming** — Full-scope adversary simulation
- **Web & API Pentest** — Manual exploit testing
- **Cloud Security** — AWS/GCP/Azure configuration review
- **Secure Code Review** — Static + human review
- **24/7 SOC** — Managed detection and response
- **Strategic Advisory** — Architecture review & SDLC hardening

### Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, capabilities, stats, RynexScore CTA |
| `/services` | Full capabilities overview & service matrix |
| `/pentest-vapt` | Web/API penetration testing service |
| `/red-team` | Red team adversary simulation |
| `/advisory` | Coordinated disclosure & advisory services |
| `/case-studies` | Anonymized client engagement summaries |
| `/about` | Team & operating principles |
| `/contact` | Contact form (Supabase-backed) |
| `/score` | RynexScore — free passive security assessment |
| `/portal` | Placeholder for RynexPortal (Phase 3) |
| `/sitemap.xml` | Server-rendered XML sitemap for SEO |

---

## Prerequisites

### System Requirements
- **Node.js 18+** (or Bun 1.0+)
- **Bun** (recommended) or **npm/yarn** for package management
- **Git** for version control
- **PostgreSQL 14+** (for local Supabase setup)

### Required Accounts/Services (Production)
- **Supabase** account (project already provisioned: `bsfdridzlzlrknudxicu`)
- **Cloudflare** account (for Workers deployment)
- **Lovable** account (for managed deployment pipeline)
- **Discord** webhook (optional, for lead notifications)

---

## Local Development Setup

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd RynexSecurity

# Install dependencies (Bun recommended for speed)
bun install

# Alternative: npm
npm install
```

### Step 2: Environment Variables

Copy the example env file and fill in local values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase (frontend public keys)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase (server-side fallback)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Discord webhook for lead notifications
DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/...
```

**Where to find these values:**
- Log in to [Supabase Console](https://supabase.com/dashboard)
- Navigate to Project Settings → API → Project URL & Anon Key
- Copy both into your `.env.local`

### Step 3: Start Development Server

```bash
# Start dev server (with HMR)
bun dev

# Dev server runs at: http://localhost:8080
```

The dev server includes:
- **Hot Module Replacement (HMR)** — instant code updates
- **TypeScript checking** — catches type errors
- **TanStack Router auto-generation** — routes auto-indexed
- **Tailwind JIT** — CSS generated on-demand

### Step 4: Verify Setup

Open http://localhost:8080 in your browser. You should see:
- Rynex Security home page
- Navigation bar (sticky top)
- Hero section with capabilities
- RynexScore call-to-action

**Troubleshooting first startup:**
- If port 8080 is in use: `bun dev --port 3000`
- If styles don't load: `bun run build` then `bun dev`
- Clear node_modules: `rm -rf node_modules && bun install`

---

## Project Structure

```
RynexSecurity/
├── src/
│   ├── routes/                      # File-based routing (TanStack Router)
│   │   ├── __root.tsx               # HTML shell, metadata, providers
│   │   ├── index.tsx                # Home page
│   │   ├── about.tsx                # Team & principles
│   │   ├── services.tsx             # Service matrix
│   │   ├── pentest-vapt.tsx         # Pentest service page
│   │   ├── red-team.tsx             # Red team service page
│   │   ├── advisory.tsx             # Advisory service page
│   │   ├── case-studies.tsx         # Client case studies
│   │   ├── contact.tsx              # Contact form
│   │   ├── score.tsx                # RynexScore assessor
│   │   ├── portal.tsx               # Admin portal (Phase 3)
│   │   └── sitemap[.]xml.ts         # Dynamic XML sitemap
│   │
│   ├── components/
│   │   ├── site-nav.tsx             # Top navigation bar
│   │   ├── site-footer.tsx          # Footer with links
│   │   └── ui/                      # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── form.tsx
│   │       ├── dialog.tsx
│   │       ├── tabs.tsx
│   │       └── ... (80+ primitives)
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx           # Mobile breakpoint detection
│   │
│   ├── lib/
│   │   ├── score.functions.ts       # Server functions for RynexScore
│   │   ├── score.server.ts          # DNS/TLS/HTTP checker helpers
│   │   ├── contact.functions.ts     # Contact form submission logic
│   │   ├── utils.ts                 # General utilities
│   │   ├── error-capture.ts         # Global error handler
│   │   ├── error-page.ts            # Error page renderer
│   │   └── lovable-error-reporting.ts  # Lovable error integration
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts            # Frontend Supabase client
│   │       ├── client.server.ts     # Server-side Supabase client
│   │       ├── auth-middleware.ts   # Auth middleware
│   │       ├── auth-attacher.ts     # Auth state provider
│   │       └── types.ts             # Supabase type definitions
│   │
│   ├── styles.css                   # Tailwind v4, design tokens, utilities
│   ├── router.tsx                   # TanStack Router config
│   ├── routeTree.gen.ts             # Auto-generated route tree
│   ├── server.ts                    # SSR error wrapper
│   └── start.ts                     # TanStack Start instance
│
├── supabase/
│   ├── config.toml                  # Supabase local config
│   └── migrations/                  # Database migration files
│       ├── 20260705180051_*.sql     # Initial schema
│       └── 20260705180114_*.sql     # Score leads table
│
├── public/
│   └── robots.txt                   # SEO robots directive
│
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite + TanStack config
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.js                 # ESLint rules
├── .prettierrc                       # Prettier config
├── .gitignore                        # Git ignore rules
├── .env.example                     # Environment template
├── bunfig.toml                       # Bun config (supply-chain guard)
├── components.json                  # shadcn/ui config
└── README.md                        # This file
```

---

## Environment Configuration

### Local Development (.env.local)

```env
# ──────────────────────────────────────────────────────────────
# Supabase Configuration
# ──────────────────────────────────────────────────────────────

# Frontend public keys (exposed to browser)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Server-side keys (kept private, used for admin operations)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ──────────────────────────────────────────────────────────────
# Optional: Integrations
# ──────────────────────────────────────────────────────────────

# Discord webhook for lead notifications
DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/xxx/yyy

# SendGrid/Mailgun (future email integration)
SENDGRID_API_KEY=SG.xxx
MAILGUN_API_KEY=key-xxx
```

### Obtaining Supabase Keys

1. Visit [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `RynexSecurity` (project_id: `bsfdridzlzlrknudxicu`)
3. Go to **Settings** → **API**
4. Copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `Anon Key` → `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `Service Role Key` (if needed for admin operations) → `SUPABASE_PUBLISHABLE_KEY`

### Production Environment (Lovable Cloud)

When deployed via Lovable:
- Environment variables are managed in Lovable Dashboard
- No `.env` file needed (managed by platform)
- Secrets are encrypted and injected at runtime
- Contact Lovable support for secrets management

---

## Database Setup

### Local Supabase Setup (Optional)

For local database development without cloud connection:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Start local Supabase stack
supabase start

# Run migrations against local database
supabase migration up

# Stop local Supabase
supabase stop
```

### Database Schema

The project uses PostgreSQL with the following key tables:

#### `score_leads` Table
Stores RynexScore assessment submissions.

```sql
CREATE TABLE score_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  email TEXT NOT NULL,
  grade TEXT, -- A, B, C, D, F
  score INTEGER, -- 0-100
  checks JSONB, -- Array of check details
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

Migration files:
- `supabase/migrations/20260705180051_*.sql` — Initial schema
- `supabase/migrations/20260705180114_*.sql` — Score leads table

To view/modify schema:
```bash
# Visit Supabase Studio
# URL: https://supabase.com/dashboard/project/[project-id]/editor

# Or view migrations locally
cat supabase/migrations/*.sql
```

### Row-Level Security (RLS)

Supabase uses RLS policies for data protection. Key policies:
- Anonymous users can insert into `score_leads` (lead capture)
- Authenticated admins can read/update
- Authenticated users see only their own records (if applicable)

---

## Development Workflow

### Common Commands

```bash
# ──────────────────────────────────────────────────────────────
# Development
# ──────────────────────────────────────────────────────────────

# Start dev server with HMR
bun dev

# Type check (no build)
bun run typecheck

# Lint code
bun run lint

# Format code
bun run format

# ──────────────────────────────────────────────────────────────
# Production Build & Testing
# ──────────────────────────────────────────────────────────────

# Production build (optimized)
bun run build

# Preview production build locally
bun run preview

# Production build in dev mode (for debugging)
bun run build:dev

# ──────────────────────────────────────────────────────────────
# Database (Supabase)
# ──────────────────────────────────────────────────────────────

# Create new migration
supabase migration new migration_name

# Apply migrations
supabase migration up

# Squash migrations
supabase migration list
supabase migration squash --start-migration-id [id]
```

### Code Style Guidelines

#### Design Tokens (Colors)

**All colors defined in `src/styles.css`:**

```css
@theme {
  colors: {
    primary: oklch(0.5 0.2 280); /* Electric blue */
    secondary: oklch(0.6 0.15 300); /* Violet */
    background: oklch(0.08 0.01 280); /* Near-black */
    foreground: oklch(0.95 0.01 280); /* Off-white */
    muted: oklch(0.4 0.05 280);
    border: oklch(0.2 0.08 280);
  }
}
```

**In components, use semantic class names:**

```tsx
// ✅ Good
<div className="bg-primary text-foreground border border-border">
  ...
</div>

// ❌ Bad (hard-coded colors)
<div className="bg-[#1f2937] text-white border border-[#374151]">
  ...
</div>
```

#### Fonts

Fonts loaded in [__root.tsx](src/routes/__root.tsx):
- `--font-display` → Orbitron (headings)
- `--font-sans` → Roboto (body)
- `--font-mono` → Fira Mono (code)

Usage in CSS:

```css
h1, h2 {
  font-family: var(--font-display);
}

body {
  font-family: var(--font-sans);
}
```

#### Custom Utilities

Defined in `src/styles.css` with `@utility`:

```css
@utility .chip {
  @apply inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-mono;
}

@utility .panel {
  @apply rounded border border-border bg-background/50 p-4;
}

@utility .text-glow {
  @apply drop-shadow-[0_0_8px_rgba(139,92,246,0.5)];
}
```

Usage:

```tsx
<div className="chip">New</div>
<div className="panel">Content</div>
<h1 className="text-glow">Glowing Text</h1>
```

#### Component Structure

```tsx
// components/my-component.tsx
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

interface MyComponentProps extends ComponentProps<"div"> {
  title: string;
  variant?: "default" | "secondary";
}

export function MyComponent({
  title,
  variant = "default",
  className,
  ...props
}: MyComponentProps) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      <h2 className="font-display text-2xl font-bold text-foreground">
        {title}
      </h2>
      <Button variant={variant}>Action</Button>
    </div>
  );
}
```

---

## Building for Production

### Pre-Build Checklist

```bash
# 1. Ensure all dependencies installed
bun install

# 2. Run type checking
bun run typecheck

# 3. Run linter
bun run lint

# 4. Test routes locally
bun dev
# Visit: http://localhost:8080/sitemap.xml
# Visit: /score, /contact — test lead capture
```

### Build Command

```bash
# Create optimized production build
bun run build

# Output: dist/ directory with:
# - .dist/client/ — browser bundle
# - .dist/server/ — SSR bundle for Cloudflare Workers
```

### Build Optimization

The build automatically:
- ✅ Tree-shakes unused code
- ✅ Minifies JavaScript & CSS
- ✅ Optimizes images
- ✅ Generates source maps
- ✅ Splits code into optimal chunks
- ✅ Pre-renders static routes

**Output size target:** < 200KB gzipped (client bundle)

### Analyze Build Size

```bash
# View bundle analysis
bun run build

# Check dist/ directory size
du -sh dist/
ls -lh dist/client/

# For detailed breakdown, use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
# Add to vite.config.ts and rebuild
```

---

## Deployment to Production

### Deployment Options

#### Option 1: Lovable Cloud (Recommended)

Lovable Cloud provides managed deployment with:
- Automatic builds on git push
- Preview deployments on PRs
- Cloudflare Workers edge runtime
- Auto-scaled Supabase backend
- CDN for static assets

**Steps:**
1. Push to connected Lovable branch
2. Lovable auto-detects changes
3. Builds and deploys to Cloudflare Workers
4. Live at https://rynexsecurity.com

**Important:** Avoid force-pushing to avoid rewriting Lovable history.

#### Option 2: Manual Cloudflare Workers Deploy

If deploying outside Lovable:

```bash
# 1. Build the app
bun run build

# 2. Install Wrangler CLI
npm install -g @cloudflare/wrangler

# 3. Login to Cloudflare
wrangler login

# 4. Create wrangler.toml (if not exists)
cat > wrangler.toml << 'EOF'
name = "rynex-security"
main = "dist/server/index.mjs"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[env.production]
route = "rynexsecurity.com/*"
zone_id = "your-zone-id"
EOF

# 5. Deploy
wrangler deploy --env production

# 6. Monitor
wrangler tail
```

#### Option 3: Docker Containerized Deployment

For custom hosting (AWS, GCP, Azure):

```dockerfile
# Dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY dist dist/
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server/index.mjs"]
```

Deploy:

```bash
docker build -t rynex-security:latest .
docker run -p 3000:3000 \
  -e VITE_SUPABASE_URL=... \
  -e VITE_SUPABASE_PUBLISHABLE_KEY=... \
  rynex-security:latest
```

### Environment Variables in Production

**Lovable Cloud:**
- Set via Lovable Dashboard → Secrets
- Injected at build/runtime
- Automatically encrypted

**Cloudflare Workers:**
```bash
wrangler secret put VITE_SUPABASE_URL
wrangler secret put VITE_SUPABASE_PUBLISHABLE_KEY
wrangler secret put DISCORD_WEBHOOK_URL
```

**Docker:**
```bash
docker run ... \
  -e VITE_SUPABASE_URL="..." \
  -e VITE_SUPABASE_PUBLISHABLE_KEY="..." \
  rynex-security:latest
```

### Post-Deployment Verification

```bash
# Test production URL
curl https://rynexsecurity.com/

# Check critical routes
curl https://rynexsecurity.com/ # Home
curl https://rynexsecurity.com/score # RynexScore
curl https://rynexsecurity.com/sitemap.xml # Sitemap

# Verify Supabase connectivity
# Test lead submission on /score page
# Check Supabase dashboard for `score_leads` records

# Monitor errors
# Lovable: Dashboard → Logs
# Cloudflare: wrangler tail
```

### Rollback Plan

If deployment fails:

**Lovable:**
1. Visit Lovable Dashboard
2. Click "Deployments"
3. Select previous working deployment
4. Click "Rollback"

**Cloudflare:**
```bash
# View recent deployments
wrangler deployments list

# Rollback to previous version
wrangler rollback

# Or deploy previous build
git checkout main~1
bun run build
wrangler deploy
```

---

## Design System & Theming

### Color Palette (OKLCH)

Defined in [src/styles.css](src/styles.css):

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | oklch(0.5 0.2 280) | Buttons, links, highlights |
| `secondary` | oklch(0.6 0.15 300) | Accents, hover states |
| `background` | oklch(0.08 0.01 280) | Page background |
| `foreground` | oklch(0.95 0.01 280) | Body text |
| `muted` | oklch(0.4 0.05 280) | Secondary text, disabled |
| `border` | oklch(0.2 0.08 280) | Borders, dividers |
| `success` | oklch(0.7 0.2 140) | Success messages |
| `destructive` | oklch(0.6 0.2 20) | Error messages |

### Custom Components & Utilities

Pre-built utilities in `src/styles.css`:

```tsx
// Navigation chip
<span className="chip">Advanced</span>

// Content panel with glow
<div className="panel panel-glow">
  Featured content
</div>

// Animated gradient text
<h1 className="text-gradient">
  Rynex Security
</h1>

// Smooth fade-up animation
<div className="fade-up">
  Animated content
</div>

// Hover lift effect
<button className="hover-lift">
  Lift on hover
</button>

// Scanline background effect
<div className="scanlines-bg">
  Content with scanlines
</div>

// Aurora background gradient
<section className="aurora-bg">
  Hero section
</section>

// Grid background pattern
<div className="grid-bg">
  Grid pattern background
</div>

// Pulsing glow effect
<div className="glow-pulse">
  Pulsing glow
</div>

// Text with glow shadow
<p className="text-glow">
  Glowing text
</p>

// Shimmer animation
<div className="text-shimmer">
  Shimmer effect
</div>
```

### Adding New Colors

1. Edit [src/styles.css](src/styles.css)
2. Add to `@theme { colors: { ... } }`
3. Use in components as `className="bg-newcolor text-newcolor"`

```css
/* src/styles.css */
@theme {
  colors: {
    primary: oklch(0.5 0.2 280);
    "alert-orange": oklch(0.7 0.15 45);
  }
}
```

Usage: `className="bg-alert-orange"`

### Dark Mode

Currently hardcoded to dark theme (cinema aesthetic). To add light mode:

```tsx
// src/routes/__root.tsx
const [isDark, setIsDark] = useState(true);

return (
  <html className={isDark ? "dark" : "light"}>
    {/* ... */}
  </html>
);
```

Then add light mode tokens:

```css
@media (prefers-color-scheme: light) {
  :root {
    --color-primary: oklch(...);
    /* ... */
  }
}
```

---

## API & Server Functions

### RynexScore Scan Function

Located in [src/lib/score.functions.ts](src/lib/score.functions.ts)

**Function: `runScoreScan(domain: string)`**

```tsx
import { runScoreScan } from "@/lib/score.functions";

// In a React component
async function checkDomain() {
  try {
    const result = await runScoreScan("example.com");
    console.log(result.grade); // "A" | "B" | "C" | "D" | "F"
    console.log(result.score); // 0-100
    console.log(result.checks); // Array of check details
  } catch (error) {
    console.error("Scan failed:", error);
  }
}
```

**Return Type:**
```typescript
interface ScoreResult {
  domain: string;
  grade: "A" | "B" | "C" | "D" | "F";
  score: number; // 0-100
  checks: CheckDetail[];
  scannedAt: string;
}

interface CheckDetail {
  name: string;
  status: "pass" | "partial" | "fail" | "error";
  score: number; // 0-1
  summary: string;
  findings: { label: string; ok: boolean; detail?: string }[];
}
```

**Checks performed:**
1. **SPF/DMARC/DKIM** — Email authentication records
2. **TLS/SSL** — Certificate validity & strength
3. **HTTP Headers** — Security headers (CSP, HSTS, etc.)
4. **DNS** — Configuration & health
5. **DNSSEC** — DNS security validation

### Contact Form Submission

Located in [src/lib/contact.functions.ts](src/lib/contact.functions.ts)

**Function: `submitContactForm(data: ContactFormData)`**

```tsx
import { submitContactForm } from "@/lib/contact.functions";

const response = await submitContactForm({
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Corp",
  message: "I'd like a pentest quote...",
});
// Returns: { success: true, id: "uuid" }
```

**Data stored in Supabase:**
- `contacts` table with encrypted PII
- Auto-notification to sales team
- Optional Discord webhook notification

### Creating New Server Functions

Use `createServerFn` from TanStack Start:

```tsx
// src/lib/my-function.ts
import { createServerFn } from "@tanstack/react-start";

export const myServerFn = createServerFn(
  { method: "POST" }, // "GET" | "POST"
  async (input: MyInput): Promise<MyOutput> => {
    // This code runs ONLY on the server
    // Safe to access env vars, databases, secrets
    
    const supabase = await createClient();
    const data = await supabase.from("table").select("*");
    
    return { result: data };
  }
);
```

**Usage in components:**
```tsx
import { myServerFn } from "@/lib/my-function";

function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  async function handleClick() {
    setLoading(true);
    try {
      const result = await myServerFn({ /* input */ });
      console.log(result);
    } finally {
      setLoading(false);
    }
  }
  
  return <button onClick={handleClick}>{loading ? "..." : "Call"}</button>;
}
```

### Supabase Client Usage

**Frontend (client-side):**
```tsx
import { supabase } from "@/integrations/supabase/client";

const { data } = await supabase
  .from("score_leads")
  .select("*")
  .order("created_at", { ascending: false });
```

**Server-side (server functions):**
```tsx
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@/integrations/supabase/client.server";

export const getLeads = createServerFn(
  { method: "GET" },
  async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("score_leads")
      .select("*");
    return data;
  }
);
```

---

## Monitoring & Error Handling

### Global Error Handler

Centralized error handling in [src/lib/error-capture.ts](src/lib/error-capture.ts):

```tsx
import { captureException } from "@/lib/error-capture";

try {
  // Code that might fail
} catch (error) {
  captureException(error, {
    context: "RynexScore",
    domain: "example.com",
  });
}
```

### Error Page

Custom error page in [src/lib/error-page.ts](src/lib/error-page.ts):

Rendered when:
- SSR fails
- Route not found (404)
- Unhandled error boundary

### Logging

**Development:**
```tsx
console.log("Message");
console.error("Error:", error);
```

**Production (Lovable):**
- Logs via Lovable Dashboard
- Real-time error alerts
- Performance metrics

**Access logs:**
- Lovable Dashboard → Logs
- Cloudflare Workers Analytics Dashboard
- Application errors → Sentry (if configured)

### Monitoring Checklist

```bash
# Check deployment status
curl -I https://rynexsecurity.com/

# Verify Supabase connectivity
curl -s https://rynexsecurity.com/score | grep "class=" # Should load

# Monitor lead submissions
# Supabase Dashboard → score_leads table → Row count increase

# Check performance
# https://PageSpeed.Insights.dev (paste your domain)

# Monitor errors
# Lovable Dashboard → Errors tab
# Or check application logs
```

---

## Performance Optimization

### Key Metrics

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s

### Optimization Techniques

#### 1. Code Splitting

TanStack Router automatically code-splits routes:
```tsx
// Each route is a separate chunk
// Loaded on-demand when navigated to
```

#### 2. Image Optimization

```tsx
// Use responsive images
<img 
  src={imagePath}
  srcSet={`${image} 1x, ${image2x} 2x`}
  loading="lazy"
  decoding="async"
/>

// Or use Next.js Image component alternative
<img alt="hero" src={heroImg} loading="lazy" />
```

#### 3. CSS Optimization

- Tailwind JIT generates only used styles
- CSS is tree-shaken in production build
- No unused CSS shipped to browser

#### 4. JavaScript Optimization

- React 19 with automatic batching
- TanStack Router tree-shaking
- Service Worker (PWA) optional

#### 5. Caching Strategy

**Browser Cache (Cloudflare):**
- Static assets: 1 year
- HTML: 5 minutes
- API responses: 10 seconds

**Configure in Cloudflare:**
```toml
# wrangler.toml
[env.production]
routes = [
  { pattern = "*/robots.txt", zone_name = "rynexsecurity.com" }
]

[[triggers.crons]]
cron = "0 0 * * *" # Daily cache purge
```

#### 6. Compression

- Gzip (already enabled on Cloudflare)
- Brotli (Cloudflare auto-negotiates)

#### 7. CDN Usage

Cloudflare Workers automatically:
- Cache static assets at edge
- Compress responses
- Minify HTML/CSS/JS
- Optimize images

### Performance Testing

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# Lighthouse CLI
npm install -g @lighthouse/cli
lighthouse https://rynexsecurity.com/

# WebPageTest
https://webpagetest.org/

# Local performance profiling
bun dev
# Open DevTools → Lighthouse tab
# Run audit
```

---

## Troubleshooting

### Common Issues

#### ❌ "npm install" fails with ENOENT

**Error:**
```
Error: ENOENT: process.cwd failed with error
```

**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### ❌ Styles not loading (Tailwind CSS not working)

**Solution:**
```bash
# Clear Vite cache
rm -rf .vite/
bun run build
bun dev
```

#### ❌ Port 8080 already in use

**Solution:**
```bash
# Use different port
bun dev --port 3000

# Or kill process using port 8080
lsof -i :8080
kill -9 <PID>
```

#### ❌ Supabase connection fails

**Symptoms:** Contact form submissions fail, RynexScore doesn't save

**Solution:**
```bash
# 1. Verify credentials in .env.local
cat .env.local | grep SUPABASE

# 2. Test Supabase connectivity
curl https://your-project.supabase.co/rest/v1/

# 3. Check Supabase status
# https://supabase.com/status

# 4. Check API keys are correct
# Copy from Supabase Dashboard → Settings → API
```

#### ❌ TypeScript errors on build

**Solution:**
```bash
# Run type check
bun run typecheck

# Show detailed errors
bun tsc --noEmit

# Fix type issues in src/
# Then rebuild
```

#### ❌ Deployment fails on Lovable

**Check:**
1. All env vars set in Lovable Secrets
2. No uncommitted changes (push to connected branch)
3. Build log for specific error: Lovable Dashboard → Deployments

**Rollback:**
```bash
# View deployments
git log --oneline -n 10

# Rollback commit
git revert HEAD
git push

# Lovable auto-rebuilds on push
```

#### ❌ RynexScore scan returns "error"

**Solution:**
```bash
# 1. Check domain is valid
# Is it a real domain? rynexsecurity.com ✅
# Is it typo? rynexsecurity.co ❌

# 2. Check DNS records
nslookup example.com
dig example.com

# 3. Check TLS certificate
openssl s_client -connect example.com:443

# 4. Check Cloudflare DNS service status
# https://www.cloudflarestatus.com/
```

#### ❌ High memory usage in production

**Causes:**
- Memory leak in component
- Unbounded query results

**Debug:**
```bash
# Check Cloudflare Workers memory
wrangler tail

# Profile locally
node --inspect dist/server/index.mjs
# Visit chrome://inspect/
```

**Fix:**
```tsx
// Add useEffect cleanup
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);

// Limit query results
const { data } = await supabase
  .from("table")
  .select("*")
  .limit(100); // Prevent unbounded queries
```

### Getting Help

**Lovable Support:**
- https://lovable.dev/support
- Email: support@lovable.dev

**TanStack Start Docs:**
- https://tanstack.com/start

**Tailwind CSS:**
- https://tailwindcss.com/docs

**Supabase:**
- https://supabase.com/docs
- Discord: https://discord.supabase.com/

**Cloudflare:**
- https://developers.cloudflare.com/
- Discord: https://discord.gg/cloudflaredev

---

## File Editing Content

Most page content is directly editable in route files:

**Update hero copy:** [src/routes/index.tsx](src/routes/index.tsx)
**Update service descriptions:** [src/routes/services.tsx](src/routes/services.tsx)
**Update team info:** [src/routes/about.tsx](src/routes/about.tsx)
**Update contact details:** [src/routes/contact.tsx](src/routes/contact.tsx)

### Adding a New Page

1. Create new route file: `src/routes/newpage.tsx`
2. Add component and export
3. Router auto-indexes the route
4. Add link in navigation: [src/components/site-nav.tsx](src/components/site-nav.tsx)
5. Add to footer links if needed: [src/components/site-footer.tsx](src/components/site-footer.tsx)

```tsx
// src/routes/newpage.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/newpage")({
  component: NewPage,
});

function NewPage() {
  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl">New Page</h1>
    </div>
  );
}
```

---

## Summary: Development to Production Checklist

### Before Going Live ✅
- [ ] `bun install` — All dependencies installed
- [ ] `bun run typecheck` — No TypeScript errors
- [ ] `bun run lint` — Code passes linting
- [ ] `bun dev` — Test locally
- [ ] Visit all routes — Verify no broken links
- [ ] Test RynexScore scan — Verify DNS/TLS checks
- [ ] Test contact form — Verify lead capture
- [ ] `.env.local` has valid Supabase keys
- [ ] `bun run build` — Production build succeeds
- [ ] `bun run preview` — Preview build locally
- [ ] `git push` to main branch

### Deployment Steps 🚀
1. **Lovable:** Auto-deploys on git push
2. **Manual:** `bun run build` → `wrangler deploy`
3. **Docker:** Build image → Push to registry → Deploy

### Post-Deployment Tests ✓
- [ ] Visit https://rynexsecurity.com/
- [ ] All pages load without errors
- [ ] RynexScore works end-to-end
- [ ] Contact form submits successfully
- [ ] Check Supabase for new records
- [ ] Monitor logs for errors
- [ ] Run Lighthouse audit
- [ ] Test on mobile devices

---

## Additional Resources

- [TanStack Start Documentation](https://tanstack.com/start)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Lovable Platform](https://lovable.dev/docs)

---

**Last Updated:** July 6, 2026  
**Project Repository:** [GitHub URL]  
**Live Site:** https://rynexsecurity.com  
**Issues/Questions:** Create an issue or contact dev team
cards / stats / grades, edit the array at the top of the component — the JSX
maps over it. Search for `TODO` or a specific string to jump to the section
you want to change.
