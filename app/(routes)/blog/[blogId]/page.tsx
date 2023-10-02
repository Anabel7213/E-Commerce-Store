"use client"

import Image from "next/image";
import axios from "axios"
import { useEffect, useState } from "react";
import { BlogPosts } from "@/interface/interface";
import { useParams } from "next/navigation";

const getPosts = async (): Promise<BlogPosts[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`)
    return response.data
  }

export default function BlogPostPage() {
    const params = useParams()
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
      const post = posts.find((post) => post.id === params.blogId)
    return (
        <div>
            {/* <button onClick={() => console.log(posts)}>test</button> */}
            {post?.isPublished && (
                <div>
                  <Image src={post.imageUrl} width={1200} height={300} alt="Blog post cover image." className="lg:h-[300px] sm:h-[200px] w-full object-cover"/>
                  <div className="flex flex-col gap-2 lg:my-16 lg:mx-64 sm:m-8">
                  <span className="text-slate-600 text-sm">{formatDate(post.date)}</span>
                  <h1 className="lg:text-3xl sm:text-2xl font-bold">{post.name}</h1>
                  <p className="text-slate-600 whitespace-pre-wrap mt-2">{post.content}</p>
                  </div>
                </div>
            )}
        </div>
    )
}