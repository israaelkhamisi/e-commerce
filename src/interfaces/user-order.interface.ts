// Shape of one order from Route API: GET /api/v1/orders/user/{userId}
export interface UserOrder {
  _id: string;
  id: number;
  shippingAddress: { details: string; phone: string; city: string };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
  cartItems: UserOrderItem[];
}

export interface UserOrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
  };
}
