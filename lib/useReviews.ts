import { useState, useEffect } from 'react';
import axios from 'axios';
import { Reviews } from '@/interface/interface';

const useFetchReviews = () => {
  const [products, setProducts] = useState<Reviews[]>([]);

  useEffect(() => {
    const getReviews = async (): Promise<Reviews[]> => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
        return response.data;
      } catch (err) {
        console.error('Error fetching reviews:', err);
        throw new Error('Failed to fetch reviews');
      }
    };

    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setProducts(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchReviews();
  }, []);

  return products;
};

export default useFetchReviews;
