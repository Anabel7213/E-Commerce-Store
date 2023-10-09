"use client"

import { Products, Reviews } from "@/interface/interface"
import axios from "axios"
import { MouseEventHandler, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ImageGallery from "react-image-gallery";
import { Info, LoaderIcon, ShoppingBagIcon, ShoppingCart } from "lucide-react"
import Rating from '@mui/material/Rating';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Review from "@/components/ui/reviews"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import useCart from "@/lib/useCart"

const getProducts = async (): Promise<Products[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    return response.data
}

const getReviews = async (): Promise<Reviews[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews`)
    return response.data
}

export default function ProductPage() {
    const cart = useCart()
    const router = useRouter()
    const params = useParams()
    const [ products, setProducts ] = useState<Products[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data = await getProducts();
            setProducts(data);
          } catch (err) {
            console.error("Error fetching product:", err);
          }
        };
    
        fetchProducts();
      }, []);
      
      const [ allReviews, setAllReviews ] = useState<Reviews[]>([])
      useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews()
                setAllReviews(data)
            } catch(err) {
                console.error("Error fetching reviews:", err);
            }
        }
        fetchReviews()
      }, [])

    const product = products.find(product => product.id === params.productId)
    const currentProductCategory = product?.category.name
    const reviews = allReviews.filter(review => review.productId === params.productId)
    const images = product?.images.map((image: any) => ({
        original: image.url
      })) || [];
    const averageRating = reviews?.map((review: any) => review.rating).reduce((acc, rating) => acc + rating, 0) / reviews.map((review) => review.rating).length;

    const hanldeAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        if(product) {
            cart.addItem(product)
        }
    }
    return (
       <div>
        {product ? (
            <div>
                <div className="flex lg:flex-row sm:flex-col gap-16 lg:m-16">
                    <div className="lg:max-w-[624px] sm:w-full lg:border sm:border-b lg:rounded-md object-cover">
                        <ImageGallery items={images} autoPlay={true} infinite={true} showPlayButton={false} showBullets={false} showNav={false} />
                    </div>
                    <div className="mx-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <Rating name="read-only" precision={0.5} value={averageRating ? averageRating : 0} readOnly />
                                <h1 className="my-4 font-bold uppercase text-xl">{product.name}</h1>
                                <p className="lg:w-[600px] sm:w-full text-slate-600">{product.description}</p>
                            </div>
                            <span className="font-bold text-xl">${product.price}.00</span>
                            <Button onClick={hanldeAddToCart} className="w-fit flex gap-2 sm:mb-16 lg:mb-0">Add to Cart <ShoppingCart size={16} /></Button>
                        </div>
                    </div>
                </div>
                <Separator />
                    <div className="lg:m-16 sm:m-4">
                    <div className="flex lg:gap-8 sm:gap-2 my-8 justify-between flex-wrap">
                        <div className="flex lg:gap-8 sm:gap-2 flex-wrap">
                        <div className="flex flex-col lg:gap-4 sm:gap-2 flex-wrap capitalize">
                                <div className="font-bold">Brand: <span className="font-normal text-slate-600">{product.brand ? product.brand : "Not specified"}</span></div>
                                <div className="font-bold">Size: <span className="font-normal text-slate-600">{product.size ? product.size : "Not specified"}</span></div>
                                <div className="font-bold">Material: <span className="font-normal text-slate-600">{product.material ? product.material : "Not specified"}</span></div>
                                <div className="font-bold">Compatibility: <span className="font-normal text-slate-600">{product.compatibility ? product.compatibility : "Not specified"}</span></div>
                        </div>
                        <div className="flex flex-col lg:gap-4 sm:gap-2 capitalize">
                                <div className="font-bold">Width: <span className="font-normal text-slate-600">{product.width ? product.width : "Not specified"}</span></div>
                                <div className="font-bold">Height: <span className="font-normal text-slate-600">{product.height ? product.height : "Not specified"}</span></div>
                                <div className="font-bold">Weight: <span className="font-normal text-slate-600">{product.weight ? product.weight + "lb" : "This is not a physical product"}</span></div>
                                <div className="font-bold">Condition: <span className="font-normal text-slate-600">{product.condition ? product.condition : "Not specified"}</span></div>
                        </div>
                        </div>
                        <div className="flex lg:border sm:border-0 sm:w-full lg:w-fit lg:flex-col sm:flex-col-reverse lg:gap-4 sm:gap-2 lg:p-4 sm:p-0 rounded-md h-fit">
                            {product.color ? <div className="font-bold flex items-center gap-2 lg:justify-between sm:justify-start">Color: <div className="border rounded-[100px] w-[32px] h-[32px]" style={{ backgroundColor: product.color }}></div></div> : null}
                            {product.isShipping ? <div className="font-bold">Shipping Cost: <span className="font-normal text-slate-600">{product.shippingCost === "" || product.shippingCost === "0" ? "Free" : product.shippingCost + ".00"}</span></div> : null}
                        </div>
                    </div>
                    </div>
                <Separator />
                <div className="lg:m-16 sm:m-4">
                    <Review />
                </div>
                <div className="lg:m-16 sm:m-4">
                    <Separator />
                    <h1 className="font-bold lg:mt-16 sm:mt-8 mb-4">Similar products &#40;{products.filter((product) => product.category.name === currentProductCategory && product.id !== params.productId).length}&#41;</h1>
                    <Separator />
                    <div className="my-8 flex gap-4 flex-wrap">
                        {products.filter((product) => product.category.name === currentProductCategory && product.id !== params.productId).map((product) => (
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
                </div>
            </div>
        ) : <span className="flex gap-2 w-full justify-center mt-16">Loading... <LoaderIcon className="animate-spin"/></span>}
       </div>
    )
}