"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import formatPhoneNumber from "@/lib/formattedPhone";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContactsPage() {
    const router = useRouter();
    const [isloading, setIsLoading] = useState(false);
    const [ data, setData ] = useState({})
    const [ formattedNumber, setFormattedNumber ] = useState()

    const handleChange = (e: any) => {
      const { name, value } = e.target
      const formattedValue = name === "phone" ? formatPhoneNumber(value) : value
      setData((data) => ({
        ...data, [name]: formattedValue
      }))
      if (name === "phone") {
        setFormattedNumber(formattedValue);
      }
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      try {
        setIsLoading(true)
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, data);
        toast.success("Inquiry sent.")
      } catch(err) {
        console.log(err)
      } finally {
        setTimeout(() => router.push("/"), 1200)
      }
    }

    return (
        <div className="flex justify-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="md:w-[500px] sm:w-full flex items-center flex-col gap-6 m-8 md:px-16 py-16 sm:px-8 bg rounded-lg shadow-sm border">
            <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold uppercase">Contact Us</h1>
            <p className="text-center text-slate-500">If you have any questions please do not hesitate to contact us. We are always here for you.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-6 flex-col w-full">
              <Input name="name" placeholder="Name" disabled={isloading} onChange={handleChange} />
              <Input name="email" placeholder="Email" disabled={isloading} onChange={handleChange} required />
              <Input name="phone" placeholder="Phone" disabled={isloading} value={formattedNumber} onChange={handleChange} />
              <Input name="subject" placeholder="Subject" disabled={isloading} onChange={handleChange} required />
              <Textarea name="message" placeholder="Please enter your message..." className="resize-none" disabled={isloading} onChange={handleChange} required />
              <Button type="submit" disabled={isloading} className="w-fit self-center">Submit</Button>
            </form>
        </div>
        </div>
    )
}