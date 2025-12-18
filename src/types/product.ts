export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: string;
  category: Category;
}

type Category = {
  id: number;
  name: string;
}