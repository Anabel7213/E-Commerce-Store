import { useState, useEffect } from 'react';
import axios from 'axios';
import { Categories } from '@/interface/interface';

const useFetchCategories = () => {
  const [categories, setCaregories] = useState<Categories[]>([]);

  useEffect(() => {
    const getCategories = async (): Promise<Categories[]> => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
        return response.data;
      } catch (err) {
        console.error('Error fetching categories:', err);
        throw new Error('Failed to fetch categories');
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCaregories(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useFetchCategories;
