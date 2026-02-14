# MODLAB: Technical Architecture & Deep Dive

## 1. System Overview
**Modlab** is a high-performance, Next.js 15 web application designed with a "Cyber-Tactical" aesthetic. It functions as a hybrid platform combining e-commerce ("The Vault"), community interaction ("Hub"), and AI generation tools ("Neural Forge").

### Technology Stack
- **Framework**: Next.js 16.1.6 (App Router, Server Components).
- **Language**: TypeScript.
- **Database**: SQLite (via Prisma ORM).
- **Authentication**: NextAuth.js v5 (Beta).
- **Styling**: Tailwind CSS v4, Framer Motion (Animations), Lucide React (Icons).
- **State Management**: Zustand (Client-side Cart).

---

## 2. Core Architecture

### App Router Structure (`/app`)
The project uses the Next.js App Router for file-system based routing.
- **Layouts (`layout.tsx`)**: Define persistent UI elements (Header, Footer).
- **Pages (`page.tsx`)**: Server Components by default, fetching data directly from the DB.
- **Server Actions (`lib/actions.ts`)**: Handle form submissions and mutations (Auth, Orders, Products) without API routes.

### Database Schema (`prisma/schema.prisma`)
The data layer is managed by Prisma with SQLite.
1.  **User**: Core identity. Contains `role` ("user" | "admin") for RBAC.
2.  **Product**: E-commerce items.
    -   `slug`: Unique URL identifier.
    -   `isLimited`: Boolean to distinguish "Drops" from standard "Vault" items.
    -   `stock`: Tracked inventory.
3.  **Order**: Links `User` and `Product`. Status tracking ("pending", "completed").
4.  **Post**: Community content for the Hub.
5.  **Creation**: AI-generated images linked to Users.

---

## 3. Key Modules & Implementation Details

### A. Authentication & Security
-   **Config**: `auth.config.ts` handles route protection logic.
-   **RBAC**: Middleware checks `session.user.role`.
    -   Admin routes (`/admin`) deny access to non-admins.
-   **Flow**:
    -   `login/page.tsx` -> `authenticate` action -> NextAuth Credential Provider.
    -   Session persists via secure, HTTP-only cookies.

### B. Admin Command Center (`/admin`)
A protected dashboard for site management.
-   **Dashboard**: Aggregates data (Revenue, User count) using `prisma.count()` and `prisma.findMany()`.
-   **Inventory**:
    -   Lists products with stock levels.
    -   **Create**: `createProduct` action handles file uploads (currently text URLs) and DB insertion.
    -   **Delete**: `deleteProduct` action removes items and revalidates the cache.
-   **Moderation**: Allows admins to delete community posts.

### C. The Vault (Store) & Checkout
-   **Store Page (`/store`)**:
    -   Fetches products where `isLimited: false`.
    -   Uses CSS Grid for responsive layout.
-   **Cart**:
    -   Managed by **Zustand** (`lib/store.ts`).
    -   Persists to `localStorage`.
-   **Checkout (`/checkout`)**:
    -   **Client**: Collects shipping info and cart data.
    -   **Server Action (`placeOrder`)**:
        1.  Verifies User session.
        2.  **Transaction**: Atomically decrements stock and creates Order records.
        3.  Returns success/failure to the client.

### D. The Hub (Community)
-   **Feed**: Displays `Post` and `Creation` records.
-   **Forums**: Tactical discussions.
-   **Intel Drops**: Announcements (pinned posts).
-   **Implementation**: Server Components render the feed; Client Components handle interactivity (like "Upvote").

### E. Neural Forge (Generator)
-   **UI**: `framer-motion` used for "scanning" and "fabrication" animations.
-   **Logic**:
    -   User inputs prompt.
    -   `api/generate` route (mocked) returns a success status.
    -   Future integration: Connect to Stability AI / OpenAI DALL-E.

---

## 4. Workflows

### Ordering Process
1.  **User** adds item to Cart (Zustand).
2.  **User** navigates to Checkout.
3.  **CheckoutPage** reads Cart state.
4.  **User** submits form -> `placeOrder` (Server Action).
5.  **Server**: Checks Stock -> Decrements Stock -> Creates Order -> Returns Result.
6.  **Client**: Clears Cart -> Shows "Mission Confirmed" screen.

### Admin Product Launch
1.  **Admin** logs in.
2.  Navigates to `/admin/products/create`.
3.  Fills form (Name, Price, Slug, Image URL).
4.  **Server**: `createProduct` validates input -> Inserts into DB -> Revalidates `/store`.
5.  **Result**: Product immediately viable in The Vault.

---

## 5. Directory Verification
-   `app/lib/actions.ts`: Central hub for all mutations.
-   `app/lib/prisma.ts`: Singleton instance of Prisma Client to prevent connection exhaustion.
-   `middleware.ts`: The gatekeeper for protected routes.

---

## 6. Code Deep Dive

### Server Actions (`app/lib/actions.ts`)
This file is the engine room of the application, handling all data mutations securely on the server.
-   **`authenticate`**: Bridges the login form to `signIn` from `auth.ts`. Handles `AuthError` (e.g., "CredentialsSignin").
-   **`createProduct`**:
    -   **Validation**: Uses `zod` schema to ensure price is positive and slug is unique.
    -   **Parsing**: Converts form data (native `FormData`) into typed objects.
    -   **Revalidation**: Calls `revalidatePath('/store')` to update the static cache immediately.
-   **`deleteProduct`**: Removes item by ID and revalidates the admin inventory list.
-   **`placeOrder`**:
    -   **Transaction**: Uses `prisma.$transaction` to ensure stock is only decremented if the order is successfully created. This prevents race conditions where an item might be sold out but the order still goes through.
    -   **Stock Check**: explicitly checks `product.stock < item.quantity` before proceeding.

### Middleware (`middleware.ts`)
The first line of defense.
-   **Matcher**: configures paths to intercept (excluding static assets and API routes).
-   **`authConfig` callback**:
    -   Checks if user is accessing `/admin`.
    -   Verifies `role === 'admin'`.
    -   Redirects unauthorized users to `/login`.

