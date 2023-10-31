"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Products } from "@/interface/interface";
import axios from "axios";
import useCart from "@/lib/useCart";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Cart from "@/components/modals/cart";
import Summary, { Subsummary } from "@/components/ui/summary";

const getProducts = async (): Promise<Products[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    return response.data
  }

export default function Navbar() {
    const cart = useCart()
    const router = useRouter()
    const pathname = usePathname()
    const routes = [
        {
            href: "/payment",
            label: "Payment",
            active: pathname === "/payment"
        },
        {
            href: "/delivery",
            label: "Delivery",
            active: pathname === "/delivery"
        },
        {
            href: "/about",
            label: "About",
            active: pathname === "/about"
        },
        {
            href: "/contacts",
            label: "Contacts",
            active: pathname === "/contacts"
        },
        {
            href: "/blog",
            label: "Blog",
            active: pathname === "/blog"
        },
    ]
    const [ isProceed, setIsProceed ] = useState(false)
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
      const searchScope = products.filter((product) => product.name.toLowerCase())
      const [ selectedItem, setSelectedItem ] = useState("")
      const handleSearch = (keyword: string | undefined) => {
        try {
            router.push(`/products/${keyword}`)
            setSelectedItem("")
            router.refresh()
        } catch(err) {
            console.log(err)
        }
      }
    return (
        <div>
            <div className="lg:hidden sm:flex gap-4 py-4 px-4 justify-between border-b">
                <Link href="/" className="flex items-center"><Image src="/logo2.svg" width={32} height={32} alt="Company logo." /></Link>
                <div className="flex flex-col">
                    <div className="border p-1 pl-4 rounded-md flex items-center justify-between shadow-sm md:w-[364px] sm:w-full sm:ml-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full"><input type="text" name="search" value={selectedItem ? selectedItem : ""} placeholder="Search products..." className="outline-none text-sm w-full bg" /></DropdownMenuTrigger>
                            <DropdownMenuContent className="h-[148px] overflow-y-scroll">
                                {searchScope.map((item) => (
                                <DropdownMenuItem className="flex p-2" key={item.id}>
                                    <button className="text-sm font-medium transition-colors hover:text-primary text-slate-500" onClick={() => setSelectedItem(item.name)}>
                                    {item.name}
                                    </button>
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="cursor-pointer p-2 rounded-md border bg-slate-100 hover:bg-slate-200"><Search size={12} onClick={() => handleSearch(searchScope.find((item) => item.name === selectedItem)?.id)}/></div>
                    </div>
                </div>
                <div className="flex gap-2">
                <Sheet>
                    <SheetTrigger><div className="hover:bg-slate-100 cursor-pointer p-2 rounded-md flex relative"><ShoppingCart size={20} /><div className="w-[16px] h-[16px] absolute rounded-[100px] top-5 left-5 bg-black text-[8px] text-slate-100 items-center justify-center flex">{cart.items.length}</div></div></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>
                        <SheetDescription>
                                {isProceed ? (
                                    <div>
                                    <p>Please select convenient shipping method. You will be redirected to Stripe to finalize checkout.</p>
                                    <Summary onProceed={() => setIsProceed(yes => !yes)}/>
                                    </div>
                                ) : (
                                    <div>
                                    <p>Review your products, and proceed to the secure checkout by clicking the button below.</p>
                                    <Cart />
                                    <Subsummary onProceed={() => setIsProceed(yes => !yes)}/>
                                    </div>
                                )}
                            </SheetDescription>
                    </SheetHeader>
                    </SheetContent>
                </Sheet>
                <nav className="flex items-center space-x-4 lg:space-x-6">
                <DropdownMenu>
                <DropdownMenuTrigger className="flex items-end"><Button variant="outline"><Menu size={16} /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    {routes.map((route) => (
                    <DropdownMenuItem className="flex p-2" key={route.href}>
                        <Link
                        key={route.href}
                        href={route.href}
                        className="text-sm transition-colors hover:text-primary"
                        >
                        {route.label}
                        </Link>
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
                </DropdownMenu>
                </nav>
                </div>
            </div>
                    
            <div className="px-8 py-4 border-b shadow-sm flex justify-between sm:hidden lg:flex">
                    <div className="gap-8 items-center flex text-sm font-medium text-slate-500">
                        <Link href="/" className="flex items-center"><Image src="/Logo.svg" width={200} height={40} alt="Company logo. //german autodoc" /></Link>
                        <div className="flex gap-4">
                            {routes.map((route) => (
                                <Link key={route.href} href={route.href} className="hover:text-slate-800">
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-8 items-center">
                    <div className="border p-1 pl-4 gap-4 rounded-md flex items-center justify-between shadow-sm w-[300px] sm:ml-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full"><input type="text" name="search" placeholder="Search products..." value={selectedItem ? selectedItem : ""} className="outline-none text-sm w-full bg" /></DropdownMenuTrigger>
                            <DropdownMenuContent className="h-[148px] overflow-y-scroll">
                                {searchScope.map((item) => (
                                <DropdownMenuItem className="flex p-2" key={item.id}>
                                    <button className="text-sm transition-colors hover:text-primary text-slate-500" onClick={() => setSelectedItem(item.name)}>
                                    {item.name}
                                    </button>
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="cursor-pointer p-2 rounded-md border bg-slate-100 hover:bg-slate-200"><Search size={12} onClick={() => handleSearch(searchScope.find((item) => item.name === selectedItem)?.id)}/></div>
                    </div>
                    <div className="md:flex sm:hidden items-center">
                        <Sheet>
                        <SheetTrigger><div className="hover:bg-slate-100 cursor-pointer p-2 rounded-md flex relative"><ShoppingCart size={20} /><div className="w-[16px] h-[16px] absolute rounded-[100px] top-5 left-5 bg-black text-[8px] text-slate-100 items-center justify-center flex">{cart.items.length}</div></div></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>Shopping Cart</SheetTitle>
                            <SheetDescription>
                                {isProceed ? (
                                    <div>
                                    <p>Please select convenient shipping method. You will be redirected to Stripe to finalize checkout.</p>
                                    <Summary onProceed={() => setIsProceed(yes => !yes)}/>
                                    </div>
                                ) : (
                                    <div>
                                    <p>Review your products, and proceed to the secure checkout by clicking the button below.</p>
                                    <Cart />
                                    <Subsummary onProceed={() => setIsProceed(yes => !yes)}/>
                                    </div>
                                )}
                            </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                        </Sheet>
                    </div>
                    </div>
            </div>
        </div>
    )
}