"use client"

import { MouseEventHandler } from "react"
import { useParams } from "next/navigation"
import ImageGallery from "react-image-gallery";
import { ShoppingCart } from "lucide-react"
import Rating from '@mui/material/Rating';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Review from "@/components/ui/reviews"
import useCart from "@/lib/useCart"
import ProductGrid from "@/components/ui/products"
import { Loader } from "@/components/ui/loader"
import ProductDetails from "@/components/ui/productDetails"
import useFetchProducts from "@/lib/useProducts"
import useFetchReviews from "@/lib/useReviews"

export default function ProductPage() {
    const params = useParams()
    const products = useFetchProducts()
    const reviews = useFetchReviews()
    const cart = useCart()
    const product = products.find(product => product.id === params.productId)
    const currentProductCategory = product?.category.name
    const filteredReviews = reviews.filter(review => review.productId === params.productId)
    const images = product?.images.map((image: any) => ({original: image.url})) || [];
    const averageRating = filteredReviews?.map((review: any) => review.rating).reduce((acc, rating) => acc + rating, 0) / filteredReviews.map((review) => review.rating).length;

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
                <ProductDetails brand={product.brand} size={product.size} material={product.material} compatibility={product.compatibility} width={product.width} height={product.height} weight={product.width} condition={product.condition} color={product.color} isShipping={product.isShipping} shippingCost={product.shippingCost}/>
                <div className="lg:m-16 sm:m-4">
                    <Review />
                </div>
                <div className="lg:m-16 sm:m-4">
                    <Separator />
                    <ProductGrid 
                        separator={<Separator className="mb-8" />} 
                        title={`Similar products (${products.filter((product) => product.category.name === currentProductCategory && product.id !== params.productId).length})`} 
                        titleStyle="font-bold lg:mt-16 sm:mt-8 mb-4" 
                        filterBy={products.filter((product) => product.category.name === currentProductCategory && product.id !== params.productId)} 
                        sortBy={products.filter((product) => product)} 
                        ifNotFound="No similar products yet!"
                    />
                </div>
            </div>
        ) :     <div className="flex h-full w-full items-center justify-center my-32">
                <Loader />
                </div>
            }
       </div>
    )
}