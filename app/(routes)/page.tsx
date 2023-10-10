"use client"

import Landing from "@/components/landing"
import { Button } from "@/components/ui/button"
import Textblock from "@/components/ui/textblock"
import { useState, useEffect } from "react"
import { Categories } from "@/interface/interface"
import axios from "axios"
import ProductGrid from "@/components/ui/products"
import useFetchProducts from "@/lib/useProducts"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleDot } from "lucide-react"


const getCategories = async (): Promise<Categories[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  return response.data
}

export default function Homepage() {
  const products = useFetchProducts()
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
        <div className="lg:flex sm:w-full sm:hidden lg:mx-16 sm:mx-4 lg:gap-1 sm:gap-0 my-8 border p-1 lg:w-fit rounded-md">
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
        <div className="sm:flex lg:hidden mx-4 py-2 px-4 border w-fit rounded-md">
        <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center"><CircleDot size={16} />Categories</DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-start w-full mx-4 my-4 bg">
          <DropdownMenuLabel>          <Button
            variant="ghost"
            className={`text-sm ${isActive === null ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
            onClick={() => handleButtonClick(null)}
          >
            All
          </Button></DropdownMenuLabel>
          <DropdownMenuSeparator />
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
        </DropdownMenuContent>
      </DropdownMenu>
        </div>
        <div className="flex gap-4 flex-wrap sm:m-4 lg:mx-16 lg:mt-4 lg:mb-16 justify-start">
          <ProductGrid filterBy={products.filter(handleFiltering)} sortBy={products} ifNotFound="No products to display yet!"/>
        </div>
        </>
    )
}