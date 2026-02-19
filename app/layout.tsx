import type { Metadata } from "next";
import "./global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "MOD LAB // High-End Custom Tactical Figures",
  description: "Hand-finished, limited run resin art toys. Sculpted in Blender, cast in high-impact resin, and painted by master artists in India. Worldwide shipping.",
  keywords: ["art toy", "resin figure", "tactical toy", "custom action figure", "indian artist", "limited edition"],
  openGraph: {
    title: "MOD LAB // High-End Custom Tactical Figures",
    description: "Hand-finished, limited run resin art toys. Made in India. Worldwide Deployment.",
    url: "https://modlab.in", // Assuming domain, can be updated later
    siteName: "MOD LAB STUDIO",
    images: [
      {
        url: "/og-image.jpg", // Needs actual image
        width: 1200,
        height: 630,
        alt: "MOD LAB TACTICAL FIGURES",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOD LAB // Tactical Art Toys",
    description: "High-impact resin figures. Hand-painted. Limited drops.",
    creator: "@modlab_studio", // Placeholder
  },
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
        <SpeedInsights />
      </body>
    </html>
  );
}