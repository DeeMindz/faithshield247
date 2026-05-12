# FaithShield247 — Complete Source Code & Setup Guide

## Overview

FaithShield247 is a Christian digital safeguarding platform built with **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Vite**. This package contains the complete source code for the web application.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| React 19 | UI framework |
| TypeScript 5.6 | Type safety |
| Tailwind CSS 4 | Styling |
| Vite 7 | Build tool & dev server |
| Wouter | Client-side routing |
| Framer Motion | Animations |
| Recharts | Charts & data visualization |
| Lucide React | Icons |
| shadcn/ui | Component library |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v22+ (download from https://nodejs.org)
- **pnpm** v10+ (install with `npm install -g pnpm`)

---

## Quick Start

```bash
# 1. Navigate to the project directory
cd faithshield247

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev

# 4. Open in browser
# Visit http://localhost:3000
```

---

## Build for Production

```bash
# Build the optimized production bundle
pnpm build

# Preview the production build locally
pnpm preview

# The built files will be in the /dist directory
```

---

## Project Structure

```
faithshield247/
├── client/
│   ├── index.html              ← HTML entry point (Google Fonts loaded here)
│   ├── public/                 ← Static files (favicon, robots.txt)
│   └── src/
│       ├── App.tsx             ← Main app with routes
│       ├── main.tsx            ← React entry point
│       ├── index.css           ← Global styles & design tokens
│       ├── components/
│       │   ├── DashboardLayout.tsx    ← Sidebar navigation layout
│       │   ├── DemoBanner.tsx         ← Investor demo mode banner
│       │   ├── NotificationCenter.tsx ← Real-time alert dropdown
│       │   ├── OnboardingTour.tsx     ← New user guided tutorial
│       │   ├── ProtectedRoute.tsx     ← Auth-gated route wrapper
│       │   └── ui/                    ← shadcn/ui components
│       ├── contexts/
│       │   ├── AuthContext.tsx        ← Authentication state
│       │   ├── DemoContext.tsx        ← Demo mode state
│       │   ├── NotificationContext.tsx ← Notifications state
│       │   └── ThemeContext.tsx       ← Theme management
│       ├── hooks/                     ← Custom React hooks
│       ├── lib/
│       │   ├── generateCanvasPDF.ts   ← PDF export utility
│       │   └── utils.ts              ← Helper functions
│       └── pages/
│           ├── Landing.tsx            ← Public landing page
│           ├── Login.tsx              ← Sign in page
│           ├── Signup.tsx             ← Registration + plan selection
│           ├── ForgotPassword.tsx     ← Password reset request
│           ├── ResetPassword.tsx      ← New password entry
│           ├── Onboarding.tsx         ← 5-step setup wizard
│           ├── Dashboard.tsx          ← Main parental dashboard
│           ├── Profiles.tsx           ← Child profile management
│           ├── ChildView.tsx          ← Safe browser for children
│           ├── TeenMode.tsx           ← Teen interface + journal
│           ├── FilterDemo.tsx         ← AI content filter demo
│           ├── ContentLibrary.tsx     ← Curated faith content
│           ├── Reports.tsx            ← Activity analytics
│           ├── SafetyReport.tsx       ← Downloadable PDF report
│           ├── ActivityTimeline.tsx   ← Family activity feed
│           ├── Settings.tsx           ← App preferences
│           ├── AdminPortal.tsx        ← Church/school admin
│           ├── ExtensionDemo.tsx      ← Browser extension prototype
│           └── BusinessCanvas.tsx     ← Business model canvas
├── server/
│   └── index.ts               ← Express server (production serving)
├── package.json               ← Dependencies & scripts
├── tsconfig.json              ← TypeScript configuration
└── vite.config.ts             ← Vite build configuration
```

---

## Key Pages & Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | Landing | Public marketing page |
| `/login` | Login | Sign in with email/password |
| `/signup` | Signup | Create account + select plan |
| `/forgot-password` | ForgotPassword | Request password reset |
| `/reset-password` | ResetPassword | Set new password |
| `/onboarding` | Onboarding | 5-step family setup wizard |
| `/dashboard` | Dashboard | Main parental control centre |
| `/profiles` | Profiles | Manage child profiles |
| `/child-view` | ChildView | Safe browser for kids |
| `/teen-mode` | TeenMode | Teen interface + devotional journal |
| `/filter-demo` | FilterDemo | AI content filter demonstration |
| `/content-library` | ContentLibrary | Curated faith-based content |
| `/reports` | Reports | Activity analytics & charts |
| `/safety-report` | SafetyReport | Downloadable PDF report |
| `/activity` | ActivityTimeline | Family activity feed |
| `/settings` | Settings | Notification & account preferences |
| `/admin` | AdminPortal | Church/school admin portal |
| `/extension-demo` | ExtensionDemo | Chrome extension prototype |
| `/business-canvas` | BusinessCanvas | Business model canvas |

---

## Demo Credentials

To test the app without creating an account:

- **Email:** `demo@faithshield247.com`
- **Password:** `demo1234`

---

## Deployment Options

### Option 1: Static Hosting (Vercel, Netlify, Cloudflare Pages)

```bash
# Build the project
pnpm build

# Deploy the /dist/public directory to any static host
```

**Vercel:**
```bash
npx vercel --prod
```

**Netlify:**
```bash
npx netlify deploy --prod --dir=dist/public
```

### Option 2: Node.js Server (Railway, Render, DigitalOcean)

```bash
# Build and start the Express server
pnpm build
pnpm start
```

### Option 3: Docker

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Customization Guide

### Change Brand Colors
Edit `client/src/index.css` — all colors are defined as CSS variables in the `:root` block using OKLCH format.

### Change Fonts
Edit `client/index.html` — update the Google Fonts `<link>` tags, then update `font-family` references in `index.css`.

### Change Logo
Search for the logo URL in source files and replace with your own image URL.

### Add New Pages
1. Create a new file in `client/src/pages/YourPage.tsx`
2. Add a route in `client/src/App.tsx`
3. Add a nav item in `client/src/components/DashboardLayout.tsx`

---

## Converting to a Native Mobile App

To submit to the App Store / Google Play, wrap this web app using **Capacitor**:

```bash
# Install Capacitor
pnpm add @capacitor/core @capacitor/cli
npx cap init FaithShield247 com.faithshield247.app

# Add platforms
npx cap add ios
npx cap add android

# Build web app and sync to native projects
pnpm build
npx cap sync

# Open in Xcode (iOS) or Android Studio
npx cap open ios
npx cap open android
```

---

## Environment Variables

For production deployment, set these in your hosting platform:

```env
PORT=3000
NODE_ENV=production
```

---

## License

Proprietary — All rights reserved by Dr. T.A. Adeparusi.

---

## Support

For questions about this codebase, contact the development team.
