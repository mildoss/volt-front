export type User = {
  id: number;
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  role: 'ADMIN' | 'USER';
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
  specs?: object;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  user?: {
    email: string;
    fullName?: string;
  };
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

export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

export type Order = {
  id: number;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  createdAt: string;
  user: User;
}