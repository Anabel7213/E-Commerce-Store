"use client"

import { Button } from "@/components/ui/button";
import Textblock from "@/components/ui/textblock";
import { BlogPosts } from "@/interface/interface";
import axios from "axios";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const getPosts = async (): Promise<BlogPosts[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`)
    return response.data
  }

export default function BlogPage() {
  const router = useRouter()
  const [ posts, setPosts ] = useState<BlogPosts[]>([]);
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getPosts();
          setPosts(data);
        } catch (err) {
          console.error("Error fetching posts:", err);
        }
      };
    
      fetchProducts();
    }, []);
    const formatDate = (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})
    }
    return (
        <div>
            <Textblock title="Blog" description="Here you’ll find lots of useful tips & tricks in the world of automobiles. Only practical curated articles written by myself from my own experience." />
            <div className="lg:ml-[32px] sm:ml-[0px]">
                    {posts.length > 0 ? (
                        <Fragment>
                            <div className="flex gap-4 flex-wrap lg:mx-16 sm:mx-4 mb-16">
                                {posts?.map((post) => (
                                    <div key={post.id} className="flex gap-4 flex-shrink-0  flex-col p-6 rounded-lg bg-white lg:w-[300px] sm:w-full shadow-sm border">
                                        <Image src={post.imageUrl} alt="Blog post cover." width={287} height={180} className="h-[180px] lg:w-[287px] sm:w-full object-cover rounded-lg"/>
                                        <h1 className="font-bold text-lg">{post.name}</h1>
                                        <span className="flex text-sm gap-2 items-center text-slate-500"><Calendar size={16} />{formatDate(post.date)}</span>
                                        <p className="text-slate-500">{post.content.slice(0,132) + "..."}</p>
                                        <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push(`/blog/${post.id}`)}>Read more</Button>
                                    </div>
                                ))}
                            </div>
                        </Fragment>
                    ) : null}
                </div>
            </div>
    )
}