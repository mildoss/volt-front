export type User = {
  id: number;
  fullName?: string;
  avatarUrl?: string;
  favorites?: Product[];
}

export type Review = {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  user: User;
}

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: Category;
  reviews: Review[];
}

type Category = {
  id: number;
  name: string;
}