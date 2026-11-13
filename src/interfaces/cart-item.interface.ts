export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string | null;
  data: CartData;
}

export interface CartData {
  _id?: string;
  cartOwner?: string;
  products: CartProduct[];
  totalCartPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: CartProductDetails;
}

export interface CartProductDetails {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  category: { _id: string; name: string; slug: string; image: string };
  brand: { _id: string; name: string; slug: string; image: string };
  subcategory: { _id: string; name: string; slug: string; category: string }[];
}