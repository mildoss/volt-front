export type User = {
  id: number;
  email: string;
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

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
}

export type Cart = {
  id: number;
  items: CartItem[];
}