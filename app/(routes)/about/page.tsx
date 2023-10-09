"use client"

import Textblock from "@/components/ui/textblock";
import ProductGrid from "@/components/ui/products";
import useFetchProducts from "@/lib/useProducts";

export default function AboutPage() {
  const products = useFetchProducts()
    return (
        <div className="flex flex-col">
            <Textblock title="About" description="With over 12 years of experience in the automotive industry, I have gained a wealth of knowledge and expertise when it comes to steering equipment. Having worked with a wide range of customers, I understand firsthand the rigorous standards that must be met to ensure customer satisfaction. Here, you can find spare parts that not only meet but exceed OEM requirements, and that I have personally had positive experience with!" />
            <video controls width={1000} height={400} className="md:w-[1000px] md:h-[400px] sm:w-full sm:h-auto self-center sm:px-8 md:px-0 rounded-lg" src="/sampleVideo.mp4" poster="/thumbnail.png"></video>
            <ProductGrid 
              containerStyle="flex flex-col items-center justify-center gap-4 lg:m-16 sm:m-8" 
              title="Check Out Featured Products" 
              titleStyle="font-bold uppercase text-center w-full my-8" 
              filterBy={products.filter((product) => product.isFeatured)} 
              sortBy={products.filter((product) => product.isFeatured)} 
              ifNotFound="No featured products yet!"
            />
        </div>
    )
}