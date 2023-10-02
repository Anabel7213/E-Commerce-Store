"use client"

import { Reviews } from "@/interface/interface"
import { Rating } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { User2 } from "lucide-react"
import ReviewsModal from "./reviewsModal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

const getReviews = async (): Promise<Reviews[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews`)
    return response.data
}

export default function Review() {
    const params = useParams()
    const [ reviews, setReviews ] = useState<Reviews[]>([])
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviews = await getReviews()
                setReviews(reviews)
            } catch(err) {
                console.log(err)
            }
        }
        fetchReviews()
    }, [])

    const formatDate = (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"})
    }
    return (
        <div>
            <ReviewsModal reviews={reviews} />
            {reviews ? (
            <div className="flex flex-col gap-4 my-4">
                {reviews.filter((review) => review.productId === params.productId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((review) => (
                    <div key={review.id}>
                        <div className="flex gap-2">
                            <div className="flex items-center bg-slate-100 w-fit h-fit p-2 rounded-[100px] border text-slate-400"><User2 size={16} /></div>
                            <div className="flex flex-col">
                                <h1 className="font-bold mb-1">{review.name}</h1>
                                <div className="flex gap-2 items-center">
                                    <Rating name="read-only" value={review.rating} readOnly size={"small"} />
                                    <span className="text-slate-500 text-sm">{formatDate(review.createdAt)}</span>
                                </div>
                                <p className="mt-2 text-slate-500">{review.content}</p>
                                <p>{review.response !== "The store has not responded to this review." ? (
                                    <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-sm">View response from the store</AccordionTrigger>
                                        <AccordionContent className="text-slate-500 text-base">
                                        {review.response}
                                        </AccordionContent>
                                    </AccordionItem>
                                    </Accordion>
                                ) : null}</p>
                            </div>
                                
                        </div>
                    </div>
                ))}
            </div>
            ) : "This product has no reviews"}
        </div>
    )
}