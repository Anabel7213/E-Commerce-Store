"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Separator } from "./separator"
import { Button } from "./button"
import { ShoppingBag } from "lucide-react"
import useCart from "@/lib/useCart"

export default function Summary() {
    const searchParams = useSearchParams()
    const items = useCart((state) => state.items)
    const removeAll = useCart((state) => state.removeAll)

    const orderTotal = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0)
    const shippingCost = items.reduce((total, item) => {
        const match = item.shippingCost.match(/^\$(\d+(\.\d+)?)$/);
        if (match) {
          const cost = parseFloat(match[1]);
          return total + cost;
        }
        return total;
      }, 0);

      useEffect(() => {
        if(searchParams.get("success")) {
            toast.success("Payment completed!")
            removeAll()
        }
        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.")
        }
      }, [searchParams, removeAll])

      const handleCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id)
        })
        window.location = response.data.url
      }
    return (
        <div className="text-slate-900 p-6 bg-slate-50 rounded-md">
            <Toaster position="top-center" />
            <h1 className="font-bold my-4 text-xl">Order Summary</h1>
            <Separator />
            <div className="flex flex-col font-bold gap-2 my-4">
            <span>Total: <span className="font-medium">${orderTotal}.00</span></span>
            <span>Shipping Cost: <span className="font-medium">{!shippingCost ? "$0.00" : shippingCost > 0 ? `$${shippingCost}.00` : 'Free'}</span></span>
            </div>
            <Button disabled={items.length === 0} onClick={handleCheckout} className="w-full flex gap-2 items-center">Check Out <ShoppingBag size={16} /></Button>
        </div>
    )
}