import { useState, useEffect } from 'react';
import axios from 'axios';
import { Products } from '@/interface/interface';

const useFetchProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const getProducts = async (): Promise<Products[]> => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        return response.data;
      } catch (err) {
        console.error('Error fetching products:', err);
        throw new Error('Failed to fetch products');
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchProducts();
  }, []);

  return products;
};

export default useFetchProducts;
