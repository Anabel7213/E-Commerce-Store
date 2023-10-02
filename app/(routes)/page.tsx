"use client"

import Landing from "@/components/landing"
import { Button } from "@/components/ui/button"
import Textblock from "@/components/ui/textblock"
import { useState, useEffect } from "react"
import { Products } from "@/interface/interface"
import { Categories } from "@/interface/interface"
import Image from "next/image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Info, ShoppingBagIcon } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

const getProducts = async (): Promise<Products[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  return response.data
}

const getCategories = async (): Promise<Categories[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  return response.data
}

export default function Homepage() {
  const router = useRouter()
  const [ categories, setCategories ] = useState<Categories[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch(err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories()
  }, [])

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

    const [ isActive, setIsActive ] = useState(null)
    const handleButtonClick = (category:any) => {
      if (category === null) {
        setIsActive(null);
        setActiveCategory("All");
      } else {
        setIsActive(category.id);
        setActiveCategory(category.name);
      }
    };
    const [ activeCategory, setActiveCategory ] = useState("All")
    const handleFiltering = (product:any) => {
      if(activeCategory === "All") {
        return true;
      } else {
        return product.category.name === activeCategory
      }
    }

    return (
        <>
        <Landing />
        <Textblock title="About the store" description="With over 12 years of experience in the automotive industry, I have gained a wealth of knowledge and expertise when it comes to steering equipment. Having worked with a wide range of customers, I understand firsthand the rigorous standards that must be met to ensure customer satisfaction. Here, you can find spare parts that not only meet but exceed OEM requirements, and that I have personally had positive experience with." />
        <div className="flex sm:w-full lg:mx-16 sm:mx-4 lg:gap-1 sm:gap-0 my-8 border p-1 lg:w-fit rounded-md">
          <Button
            variant="ghost"
            className={`text-sm ${isActive === null ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
            onClick={() => handleButtonClick(null)}
          >
            All
          </Button>
            {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`text-sm ${isActive === category.id ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
                  onClick={() => handleButtonClick(category)}
                >
                  {category.name}
                </Button>
            ))}
        </div>
        <div className="flex gap-4 flex-wrap sm:m-4 lg:mx-16 lg:mt-4 lg:mb-16 justify-start">
          {products.filter(handleFiltering).map((product:any) => (
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
                    <Button onClick={() => router.push(`/products/${product.id}`)} className="flex gap-2 items-center w-full">Purchase<ShoppingBagIcon size={16} /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
    )
}