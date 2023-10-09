import { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPosts } from '@/interface/interface';

const useFetchPosts = () => {
  const [products, setProducts] = useState<BlogPosts[]>([]);

  useEffect(() => {
    const getPosts = async (): Promise<BlogPosts[]> => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
        return response.data;
      } catch (err) {
        console.error('Error fetching posts:', err);
        throw new Error('Failed to fetch posts');
      }
    };

    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setProducts(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchPosts();
  }, []);

  return products;
};

export default useFetchPosts;
