import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function ModLabHome() {
  // Fetch only non-limited products for the "Vault" section
  const products = await prisma.product.findMany({
    where: { isLimited: false },
    take: 3, // Show top 3 in vault on home
  });

  return <HomeClient products={products} />;
}
