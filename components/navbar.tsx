"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Products } from "@/interface/interface";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import useCart from "@/lib/useCart";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Cart from "@/components/ui/cart";
import Summary from "@/components/ui/summary";

const getProducts = async (): Promise<Products[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    return response.data
  }

export default function Navbar() {
    const cart = useCart()
    const { isSignedIn, user } = useUser()
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
            <div className="lg:hidden sm:flex gap-4 py-4 px-8 justify-between border-b">
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

            <div className="px-8 py-4 border-b shadow-sm flex justify-between sm:hidden lg:flex">
                    <div className="gap-8 items-center flex text-sm font-medium text-slate-500">
                        <Link href="/" className="flex items-center"><Image src="/Logo.svg" width={124} height={24} alt="Company logo." /></Link>
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
                    <div className={isSignedIn ? "md:flex sm:hidden items-center gap-2" : "md:flex sm:hidden items-center"}>
                        {isSignedIn ? <UserButton afterSignOutUrl="/"/> : <div className="hover:bg-slate-100 cursor-pointer p-2 rounded-md"><User onClick={() => router.push("/user")} size={20} /></div> }
                        <Sheet>
                        <SheetTrigger><div className="hover:bg-slate-100 cursor-pointer p-2 rounded-md flex relative"><ShoppingCart size={20} /><div className="w-[16px] h-[16px] absolute rounded-[100px] top-5 left-5 bg-black text-[8px] text-slate-100 items-center justify-center flex">{cart.items.length}</div></div></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle>{user ? `Hello, ${user?.firstName}!` : "No items"}</SheetTitle>
                            <SheetDescription>
                                {user ? (
                                    <div>
                                        <p>This is your shopping cart. Proceed to the secure checkout by clicking the button below.</p>
                                        <Cart />
                                        <Summary />
                                    </div>
                                    ) : (
                                    <div>
                                        <p>Please sign in to see your shopping cart and complete the checkout.</p>
                                        <Button variant="outline" className="mt-4 w-full" onClick={() => router.push("/user")}>Sign in</Button>
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