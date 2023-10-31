"use client"

import useCart from "@/lib/useCart"
import CartItem from "../ui/cartItem"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

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
            {cart.items.length === 0 ? 
                <span className="w-full p-8 flex flex-col gap-4 border-dashed border h-fit text-center rounded-md">
                <span className="flex gap-4"><Skeleton className="w-[80px] h-[40px] rounded-md" /><Skeleton className="w-full h-[40px] rounded-md" /></span>
                <span className="flex gap-4"><Skeleton className="w-full h-[40px] rounded-md" /><Skeleton className="w-[80px] h-[40px] rounded-md" /></span>
                <span className="flex gap-4"><Skeleton className="w-[80px] h-[40px] rounded-md" /><Skeleton className="w-full h-[40px] rounded-md" /></span>
                </span> 
                : (
                <div className="flex flex-col gap-4">
                    {cart.items.map((item) => (
                        <CartItem key={item.id} data={item} />
                    ))}
                </div>
            )}
        </div>
    )
}