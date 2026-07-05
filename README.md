# Garage Wala — On-Demand Vehicle Assistance

**One App. All Vehicle Solutions.**

Premium marketing website + role-based auth + customer dashboard for Garage Wala, built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, and Firebase.

---

## What's included in this build

- **Marketing site** — hero with a real Three.js 3D scene (animated vehicle, road, glowing location pin), live-demo request flow animation, features grid, services, garage-partner section, how-it-works timeline, app showcase, pricing, testimonials, FAQ, contact, footer
- **Authentication** — Email/Password signup & login, Google sign-in, forgot-password, role selection (Customer / Garage / Admin) on both login and signup, wired to real Firebase Auth, redirects to the correct role's dashboard
- **Customer Dashboard** — book a service (writes a real document to Firestore `bookings` collection when clicked), live tracking placeholder, invoices, payment methods, notifications
- **Garage Dashboard** — today's earnings/orders/rating stats, 7-day revenue chart (Recharts), real-time orders table, mechanics roster with status, weekly availability grid, online/offline toggle
- **Admin Dashboard** — platform-wide stats, bookings growth chart, service-mix breakdown, a **live Firestore feed** showing real bookings the instant a customer books a service (open two browser tabs — one on `/dashboard/customer`, one on `/dashboard/admin` — to see it update live), manage users table, manage garages table, coupons
- Dark/light mode, fully responsive, SEO metadata, reduced-motion support

## Not yet included (next phases)

Razorpay/UPI payments, live map tracking (Google Maps), push/SMS notifications, the full admin CMS (editable homepage content, blog, etc.), and garage-accepts/mechanic-assigned booking status transitions were intentionally left out of this phase. The booking write/read loop (customer → Firestore → admin) is real and working — the next phase would build the garage side of accepting/completing those same bookings, plus payments. Ask to continue and we'll build the next phase on top of this.

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

Copy `.env.example` to `.env.local` and fill in your Firebase project's web app config (Firebase Console → Project Settings → General → Your apps):

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

These are public client keys — safe to expose in a browser bundle. Real protection comes from Firestore Security Rules, not from hiding this file.

In the Firebase Console, make sure you've enabled:
- **Authentication → Sign-in method:** Email/Password and Google
- **Firestore Database:** created (Native mode)

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Going live with real users — do this before launch

1. **Publish the production Firestore rules.** Go to Firebase Console → Firestore Database → Rules, replace whatever is there with the contents of `firestore.rules` in this repo, and click **Publish**. This replaces the open "anyone can read/write" development rule with real per-user, per-role access control (a customer can only create/read their own bookings; only garages/admins see incoming bookings; a user can never grant themselves a different role).
2. **Dashboards now require login.** Visiting `/dashboard/customer`, `/dashboard/garage`, or `/dashboard/admin` without being signed in redirects to `/login`. Signing in as the wrong role for a given dashboard redirects you to your own role's dashboard.
3. **Add your production domain to Firebase Auth's authorized domains** — Firebase Console → Authentication → Settings → Authorized domains → add your Netlify/Vercel URL (and custom domain if you attach one), or Google sign-in will fail on the live site.
4. **Rotate any credentials that were ever shared in chat, screenshots, or committed by mistake** — Firebase web config keys are safe to keep public, but if you ever pasted a *GitHub token*, *Razorpay secret key*, or similar into a chat/screenshot, revoke and regenerate it.
5. Consider adding Firestore composite indexes if the "Live bookings" admin panel or any future queries prompt for one — Firestore will link you directly to create it when needed.

## Firestore security rules (development — do NOT use in production)

If your Firestore was created in **production mode**, all reads/writes are denied by default. For development, go to Firebase Console → Firestore Database → Rules, and use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This allows any signed-in user to read/write — fine for development with no real user base yet. Before real users join, tighten this further (e.g. users can only write their own `users/{uid}` document, bookings scoped to the customer/garage involved, etc.) — ask and we'll write production-ready rules for the full schema once the Garage/Admin dashboards and Firestore collections are built.

---

## Deployment (Vercel)

1. Push this project to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add the same environment variables from `.env.local` in Vercel's Project Settings → Environment Variables
4. Deploy — Vercel auto-detects Next.js, no extra config needed

## Deployment (Netlify)

1. Push to GitHub, import in Netlify
2. Build command: `npm run build`, Publish directory: `.next`
3. Install the official `@netlify/plugin-nextjs` plugin (Netlify prompts for this automatically for Next.js repos)
4. Add the same environment variables in Site settings → Environment variables

---

## Project structure

```
src/
  app/
    (marketing)/       → public homepage
    (auth)/             → login, signup, forgot-password
    dashboard/
      customer/         → customer dashboard (live)
  components/
    sections/           → hero, features, services, pricing, etc.
    three/               → React Three Fiber hero scene
    layout/              → navbar, footer
    ui/                  → button, card, input, accordion
  contexts/
    auth-context.tsx     → Firebase Auth wiring (signup/login/Google/reset)
  lib/
    firebase.ts          → Firebase app initialization
```

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP · React Three Fiber / Three.js · Firebase Auth & Firestore · Recharts · React Hook Form + Zod

