"use client"

import useCart from "@/lib/useCart"
import CartItem from "./cartItem"
import { useEffect, useState } from "react"

export const revalidate = 0

export default function Cart() {
    const [ isMounted, setIsMounted ] = useState(false)
    const cart = useCart()

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <div className="flex flex-col gap-4 overflow-y-scroll max-h-[290px] my-6">
            {cart.items.length === 0 ? <span className="w-full p-2 border text-center rounded-sm">The cart is empty.</span> : (
                <div className="flex flex-col gap-4">
                    {cart.items.map((item) => (
                        <CartItem key={item.id} data={item} />
                    ))}
                </div>
            )}
        </div>
    )
}