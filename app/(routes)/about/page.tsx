"use client"

import { Button } from "@/components/ui/button";
import Textblock from "@/components/ui/textblock";
import { Info, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { Products } from "@/interface/interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const getProducts = async (): Promise<Products[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    return response.data
  }

export default function AboutPage() {
    const [ products, setProducts ] = useState<Products[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getProducts();
            setProducts(data);
          } catch (err) {
            console.error("Error fetching products:", err);
          }
        };
      
        fetchProducts();
      }, []);
    return (
        <div className="flex flex-col">
            <Textblock title="About" description="With over 12 years of experience in the automotive industry, I have gained a wealth of knowledge and expertise when it comes to steering equipment. Having worked with a wide range of customers, I understand firsthand the rigorous standards that must be met to ensure customer satisfaction. Here, you can find spare parts that not only meet but exceed OEM requirements, and that I have personally had positive experience with!" />
            <video controls width={1000} height={400} className="md:w-[1000px] md:h-[400px] sm:w-full sm:h-auto self-center sm:px-8 md:px-0 rounded-lg" src="/sampleVideo.mp4" poster="/thumbnail.png"></video>
            <div className="flex flex-col items-center justify-center gap-4 lg:m-16 sm:m-8">
                <h1 className="font-bold uppercase text-center w-full my-8">Check out Featured Products</h1>
                <div className="flex gap-4 flex-wrap">
                    {products.filter((product) => product.isFeatured).length > 0 ? (
                        products.filter((product) => product.isFeatured).map((product) => (
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
                                  <span className="text-sm capitalize">Size: {product.size}</span>
                                  <span className="text-sm capitalize">Material: {product.material}</span>
                                </div>
                                </HoverCardContent>
                                </HoverCard>
                                <Button className="flex gap-2 items-center w-full">Purchase<ShoppingBagIcon size={16} /></Button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : <div className="flex w-full justify-center pb-8"><span className="flex text-slate-400 shadow-sm border rounded-lg bg-slate-50 py-2 px-4">No products have been featured yet</span></div>}
                </div>

            </div>
        </div>
    )
}