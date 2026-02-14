"use client";

import { useCartStore } from "@/lib/store";
import { Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(product)}
            className="bg-cyan-400 text-black border-[4px] border-black px-8 py-4 font-black italic uppercase text-xl flex items-center gap-3 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#ec008c] transition-all"
        >
            <ShoppingCart className="w-6 h-6" />
            Add_To_Cart
        </motion.button>
    );
}
