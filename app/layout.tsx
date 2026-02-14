import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "MOD LAB // Action Figure Studio",
  description: "Hand-painted, limited edition custom miniatures.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // ... existing imports

  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#f0f0f0]">
        <Header user={session?.user} /> {/* Your header at the top */}

        <main>
          {children} {/* This is where your long scrolling page goes */}
        </main>

        <Footer /> {/* 2. ADD THIS LINE AT THE VERY BOTTOM */}
        <CartSidebar />
      </body>
    </html>
  );
}