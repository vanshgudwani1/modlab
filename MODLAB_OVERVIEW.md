
# MOD LAB // PROJECT OVERVIEW

## 1. MISSION BRIEF
**MOD LAB** is a high-performance e-commerce and community platform designed for custom tactical action figures. It blends a "Cyberpunk / Tactical" aesthetic with modern web technologies to create an immersive user experience.

- **Theme**: Industrial, High-Contrast, Sci-Fi, Tactical.
- **Core Function**: Showcasing custom figures, selling products, and hosting a community hub.

---

## 2. THE TECH STACK (What it's made of)
The platform is built on a cutting-edge **Next.js 15** architecture, optimized for speed, SEO, and interactivity.

### Frontend (The Visuals)
- **Next.js 15 (App Router)**: React framework for server-side rendering and routing.
- **Tailwind CSS**: Utility-first styling for rapid, custom designs.
- **Framer Motion**: Powering complex animations (parallax, scroll reveals, hover effects).
- **React Three Fiber**: Rendering the 3D "Hero Scene" (the floating knot).
- **Lucide React**: Iconography.

### Backend (The Brains)
- **Next.js Server Actions**: Handling logic securely on the server (no separate API server needed).
- **Prisma ORM**: Interacting with the database using type-safe queries.
- **SQLite**: The database engine (stored locally as `dev.db` for development).
- **NextAuth.js (v5)**: Handling authentication, sessions, and role-based access control (RBAC).
- **Bcryptjs**: Encrypting passwords for security.

### State Management
- **Zustand**: Managing the Shopping Cart state globally across the app.

---

## 3. KEY FEATURES (How it works)

### A. The Storefront
- **Dynamic Homepage**: Features kinetic typography, 3D elements, and smooth scroll animations.
- **Product Vault**: Fetches real-time inventory from the database.
- **Cart System**: Persists items while browsing.
- **Checkout Flow**: Validates shipping info, mocks payment processing, and creates orders in the DB (deducting stock automatically).

### B. The Hub (Community)
- **Forum System**: Users can post builds and comments.
- **Categories**: Filters for "Community Builds" vs "Official Announcements".
- **Real-time constraints**: Only Admins can post "Announcements".

### C. Admin Command Center (`/admin`)
- **Secure Access**: Protected by Middleware and Role checks. Only users with `role: 'ADMIN'` can enter.
- **Dashboard**: Live stats on Revenue, Orders, and Users.
- **Inventory Management**: Create, Edit, and Delete products.
- **Moderation**: Delete inappropriate posts from the Hub.

---

## 4. FILE ARCHITECTURE (Where things live)

- **`/app`**: The core application routes.
    - `page.tsx`: Homepage.
    - `layout.tsx`: Global wrapper (Header/Footer).
    - `/admin`: Admin panel routes.
    - `/hub`: Community forum routes.
    - `/checkout`: Checkout flow.
    - `/api`: Backend endpoints (limited use, mostly Server Actions used instead).
    
- **`/components`**: Reusable UI blocks.
    - `Header.tsx`: Navigation bar.
    - `HeroScene.tsx`: The 3D background element.
    - `HomeClient.tsx`: The main interactive homepage logic.

- **`/lib`**: Helper functions.
    - `actions.ts`: Server-side logic (Login, Post Creation, Checkout).
    - `store.ts`: Zustand cart store.

- **`/prisma`**: Database configuration.
    - `schema.prisma`: The blueprint for Users, Products, Orders, etc.
    - `dev.db`: The actual database file.

---

## 5. SECURITY PROTOCOLS
1.  **Middleware**: Intercepts requests to `/admin` and kicks out unauthorized users.
2.  **Environment Variables**: Secrets are stored in `.env` (never committed to git).
3.  **Password Hashing**: User passwords are salted and hashed before storage.

---

**STATUS**: OPERATIONAL // DEPLOYMENT READY
