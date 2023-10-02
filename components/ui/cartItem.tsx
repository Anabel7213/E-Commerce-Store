import { Products } from "@/interface/interface"
import Image from "next/image"
import { Trash } from "lucide-react"
import useCart from "@/lib/useCart"
import { Button } from "./button"

interface CartItemProps {
    data: Products
}

export default function CartItem(props: CartItemProps) {
    const cart = useCart()
    const handleRemoveItem = () => {
        cart.removeItem(props.data.id)
    }
    return (
            <div className="border p-4 rounded-md flex items-center h-[84px]">
                <Image src={props.data.images[0].url} width={64} height={32} alt="Product image." className="w-[48px] h-[24px]" />
                <div className="flex w-full">
                    <div className="flex flex-col gap-1 lg:ml-4 sm:ml-0 text-sm w-full">
                        <h1 className="font-bold text-slate-900">{props.data.name}</h1>
                        <span>${props.data.price}.00</span>
                    </div>
                    <Button variant="ghost" onClick={handleRemoveItem} className="self-start"><Trash size={12} /></Button>
                </div>
            </div>
    )
}