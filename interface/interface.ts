export interface Products {
  id: string;
  name: string;
  category: any;
  size: string;
  images: any;
  color: string;
  price: number;
  condition: string;
  brand: string,
  compatibility: string,
  material: string;
  width: string;
  height: string;
  description: string;
  quantity: number;
  isFeatured: boolean;
  isArchived: boolean;
  isShipping: boolean;
  weight: number;
  shippingCost: string;
}

export interface Categories {
    id: string,
    name: string
}

export interface BlogPosts {
    id: string,
    name: string,
    date: string,
    content: string,
    imageUrl: string,
    isPublished: boolean,
    isArchived: boolean,
}

export interface Reviews {
  id: string,
  name: string,
  content: string,
  response: string,
  rating: number,
  productId: string
  createdAt: string,
}