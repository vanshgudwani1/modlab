
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "./edit-form";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id }
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black italic uppercase text-white">Edit_Asset_Protocol</h2>
            </div>
            <EditProductForm product={product} />
        </div>
    );
}
