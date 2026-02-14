import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@prisma/client'

export interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearCart: () => void
    isOpen: boolean
    toggleCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product) => {
                const currentItems = get().items
                const existingItem = currentItems.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true, // Open cart when adding item
                    })
                } else {
                    set({
                        items: [...currentItems, { ...product, quantity: 1 }],
                        isOpen: true,
                    })
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                })
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
        }),
        {
            name: 'modlab-cart',
        }
    )
)
