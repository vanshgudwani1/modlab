import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function ModLabHome() {
  // Fetch only non-limited products for the "Vault" section
  const products = await prisma.product.findMany({
    where: { isLimited: false },
    take: 3, // Show top 3 in vault on home
  });

  // Fetch limited products for the "Limited Drops" section
  const limitedProducts = await prisma.product.findMany({
    where: { isLimited: true },
    take: 3, // Show top 3 limited
  });

  return <HomeClient products={products} limitedProducts={limitedProducts} />;
}
