# MOD LAB Project Documentation - Technical Overview

## 1. Project Overview
**Name**: MOD LAB
**Type**: E-Commerce & Community Platform for Custom Tactical Figures
**Core Concept**: A high-end, cyberpunk-themed storefront ("The Vault") and community hub ("The Hub") for selling and sharing custom-modded action figures. The site features a distinct "Grit/Cyber" aesthetic with glitch effects, 3D elements, and raw industrial styling.

## 2. Technology Stack

### Core Frameworks
-   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router Architecture)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling)

### Key Libraries
-   **Animations**: `framer-motion` (Complex page transitions, scroll reveals, glitch effects)
-   **3D Rendering**: `@react-three/fiber` & `@react-three/drei` (Hero scene)
-   **State Management**: `zustand` (Cart state, global UI state)
-   **Database ORM**: `prisma` (PostgreSQL interaction)
-   **Icons**: `lucide-react`
-   **Authentication**: `next-auth` (User sessions)

### Backend & Database
-   **Database**: PostgreSQL
-   **ORM**: Prisma Schema defined in `prisma/schema.prisma`
-   **Environment**: Node.js Server Actions & API Routes

## 3. Architecture & File Structure

### Directory Breakdown
-   **`/app`**: Main application routes (App Router).
    -   `page.tsx`: Landing page (wraps `HomeClient`).
    -   `layout.tsx`: Root layout with `Header`, `Footer`, and `CartSidebar`.
    -   `/store`: Product listing and details (`[slug]`).
    -   `/hub`: Community posts and user profiles.
    -   `/api`: Backend API endpoints (e.g., `auth`, `webhooks`).
    -   `/admin`: Dashboard for product/order management.
-   **`/components`**: Reusable UI components.
    -   `HomeClient.tsx`: Massive client-side component for the landing page animations.
    -   `Header.tsx` / `Footer.tsx`: Global navigation and site footer.
    -   `HeroScene.tsx`: 3D Canvas component.
    -   `CartSidebar.tsx`: Shopping cart slide-out.
-   **`/lib`**: Utilities and configurations.
    -   `prisma.ts`: Singleton Prisma client instance.
    -   `store.ts`: Zustand store definitions (Cart logic).

## 4. Key Features & Implementation

### A. The "Cyber" Aesthetic
-   **Implementation**: Custom Tailwind classes, `framer-motion` variants, and `GlitchText` components.
-   **Styles**: Raw borders (`border-4 border-black`), neon accent colors (Cyan `#22d3ee`, Pink `#ec008c`, Yellow `#fdf003`), and aggressive drop shadows.

### B. 3D Hero Section
-   **File**: `components/HeroScene.tsx`
-   **Tech**: React Three Fiber
-   **Behavior**: A rotating 3D knot/mesh with distortion material that reacts to scroll or mouse movement (optimized for mobile).

### C. Shopping Cart System
-   **State**: Managed via Zustand (`useCartStore`) in `lib/store.ts`.
-   **Persistence**: Cart data stored in LocalStorage via `persist` middleware.
-   **UI**: `CartSidebar.tsx` overlays the screen when toggled.

### D. Authentication & User Profiles
-   **Auth**: NextAuth.js handling sessions.
-   **Database**: `User` model linked to `Order` and `Creation` (community posts).
-   **Access**: User avatar and status displayed in `Header.tsx`.

### E. Mobile Responsiveness
-   **Strategy**: Mobile-first tweaks applied in `HomeClient` and `Header`.
-   **Recent Polish**:
    -   Floating "Glassmorphism" header on mobile.
    -   Responsive typography using `clamp()` and media queries.
    -   Touch-optimized layout (reduced spacing/padding).

## 5. Database Schema (Overview)
*See `prisma/schema.prisma` for full definition.*

-   **User**: `id`, `email`, `role`, `creations`, `orders`
-   **Product**: `id`, `slug`, `name`, `price`, `stock`, `isLimited`
-   **Order**: `id`, `userId`, `products`, `status`
-   **Creation**: `id`, `userId`, `imageUrl` (Community posts)

## 6. Deployment & Environment
-   **Env Variables**:
    -   `DATABASE_URL`: Connection string for PostgreSQL.
    -   `NEXTAUTH_SECRET`: Encryption key for auth.
    -   `NEXT_PUBLIC_...`: Public keys if needed.
