"useClient"

import { Rating } from "@mui/material";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Separator } from "./separator";
import axios from "axios";
import { Products } from "@/interface/interface";
import toast, { Toaster } from "react-hot-toast";
  
const getProducts = async (): Promise<Products[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  return response.data
}

export default function ReviewsModal({reviews}: {reviews:any}) {
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
    
  const params = useParams()
  const [ data, setData ] = useState({}) 
  const productId = products.find((product) => product.id === params.productId)?.id
  const productName = products.find(product => product.id === params.productId)?.name
    const handleChange = (e: any) => {
      const value = e.target.name === 'rating' ? parseInt(e.target.value, 10) : e.target.value;
      setData({...data, [e.target.name]: value})
    }
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        const requestData = {
          ...data, 
          productId,
          productName,
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, requestData)
        // console.log(requestData)
        toast.success("Review published!")
        setTimeout(() => window.location.reload(), 1000)
      } catch(err) {
        console.log(err)
        toast.success("Oh no! Something went wrong.")
      }
    }
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex justify-between items-center">
                <h1 className="font-bold">All reviews <span>&#40;{reviews ? reviews.filter((review: any) => review.productId === params.productId).length : 0}&#41;</span></h1>
                <AlertDialog>
                <AlertDialogTrigger><Button variant="ghost" className="flex gap-2 items-center"><Plus size={16} /> Add review</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Give feedback</AlertDialogTitle>
                    <AlertDialogDescription>
                        We are commited to improving our services, and delivering better experience for every customer. Feel free to share your thoughts, we would love to hear what you think!
                    </AlertDialogDescription>
                    <form onSubmit={handleSubmit} className="flex gap-2 flex-col my-2" id="review">
                        <Rating name="rating" defaultValue={0} onChange={handleChange} />
                        <Input name="name" placeholder="Your name" onChange={handleChange} />
                        <Textarea name="content" placeholder="Write a brief review..." onChange={handleChange} maxLength={400}/>
                    </form>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction><Button type="submit" form="review">Submit</Button></AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Separator className="mt-2"/>
            
        </div>
    )
}