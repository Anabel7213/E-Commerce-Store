"use client"

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell, FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import jsonp from "jsonp"
import toast, { Toaster } from "react-hot-toast";

export default function Footer() {
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
    const [ email, setEmail ] = useState("")
    const router = useRouter()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            const url = process.env.NEXT_PUBLIC_MAILCHIMP
            jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_, data) => {
                const { msg, result } = data
                alert(msg);
            });
            toast.success("Successfully Subscribed!")
            setTimeout(() => router.push("/"), 1000)
            setEmail("")
        } catch(err) {
            console.log(err)
            toast.success("Oh Snap! That didn't go right.")
        }
    }
    return (
        <>
        <Toaster position="top-center" />
        {/* <button onClick={() => console.log(test)}>test</button> */}
        <div className="border-t mt-8 sm:mx-4 lg:mx-8">
            <div className="gap-2 border rounded-md mt-8 py-16 px-8 flex flex-col items-center">
                <h1 className="text-xl font-bold">Join the newsletter!</h1>
                <form onSubmit={handleSubmit} className="border p-1 pl-4 rounded-lg flex items-center justify-center shadow-sm lg:w-[400px] sm:w-full bg mt-4">
                    <input id="mce-EMAIL" type="text" name="EMAIL" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="outline-0 text-sm w-full bg text-black" required />
                    <Button className="flex gap-2 items-center"><Bell size={16}/>Subscribe</Button>
                </form>
            </div>
            <div className="lg:m-8 sm:m-4 text-sm font-medium flex justify-between flex-wrap items-center">
                <div className="gap-8 md:flex sm:hidden text-slate-500">
                {routes.map((route) => (
                    <Link href={route.href} key={route.href} className="hover:text-neutral-800 transition-all">
                        {route.label}
                    </Link>
                ))}
                </div>
                <div className="flex sm:w-full lg:my-0 lg:justify-normal lg:w-fit sm:justify-center">
                    <Button variant="ghost"><FacebookIcon size={16} /></Button>
                    <Button variant="ghost"><TwitterIcon size={16} /></Button>
                    <Button variant="ghost"><InstagramIcon size={16} /></Button>
                    <Button variant="ghost"><YoutubeIcon size={16} /></Button>
                </div>
            </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm sm:mx-4 lg:mx-8 py-8 text-slate-500">
                <span>Designed & Built by <Link href="https://www.linkedin.com/in/anastasia-bielievitina-b20396259/" className="underline hover:text-slate-950">Anabel</Link></span>
                <div className="flex gap-4">
                    <Link href="/" className="hover:text-neutral-800 transition-all">Terms of Use</Link>
                    <Link href="/" className="hover:text-neutral-800 transition-all">Privacy Policy</Link>
                </div>
            </div>
        </>
    )
}