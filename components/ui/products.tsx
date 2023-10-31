"use client"

import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { Info, ShoppingBagIcon } from "lucide-react";
import { Products } from "@/interface/interface";

export default function ProductGrid({separator, containerStyle, title, titleStyle, filterBy, sortBy, ifNotFound}: any) {
    const router = useRouter()
    return (
        <div className={containerStyle}>
        <h1 className={titleStyle}>{title}</h1>
        {separator}
        <div className="flex gap-4 flex-wrap">
            {sortBy.length > 0 ? (
                filterBy.map((product: Products) => (
                    <div key={product.id} className="border flex items-start rounded-lg flex-col p-6 gap-2 lg:w-[248px] sm:w-full">
                    <Image src={product.images[0].url} width={236} height={200} alt="Product Image" className="lg:w-[236px] lg:h-[200px] sm:w-full object-contain"/>
                    <div className="flex flex-col gap-4 items-start w-full">
                      <h1 className="text-sm uppercase sm:h-fit lg:h-[42px] custom-font">{product.name}</h1>
                      <span className="font-bold text-xl">${product.price}.00</span>
                      <div className="flex gap-4 justify-between w-full">
                        <HoverCard>
                        <HoverCardTrigger><Button variant="outline" className="bg"><Info size={16} /></Button></HoverCardTrigger>
                        <HoverCardContent className="bg">
                        <div className="flex flex-col">
                        <span className="text-sm capitalize">Size: {product.size ? product.size : "Not specified"}</span>
                        <span className="text-sm capitalize">Material: {product.material ? product.material : "Not specified"}</span>
                        </div>
                        </HoverCardContent>
                        </HoverCard>
                        <Button onClick={() => router.push(`/products/${product.id}`)} className="flex gap-2 items-center w-full">View Product</Button>
                      </div>
                    </div>
                  </div>
                ))
            ) : <div className="flex w-full justify-center pb-8"><span className="flex text-slate-400 shadow-sm border rounded-lg bg-slate-50 py-2 px-4">{ifNotFound}</span></div>}
        </div>

    </div>
    )
}