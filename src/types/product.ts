export type User = {
  id: number;
  email: string;
  name?: string;
  avatarPath?: string;
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
  stock: string;
  category: Category;
  reviews: Review[];
}

type Category = {
  id: number;
  name: string;
}