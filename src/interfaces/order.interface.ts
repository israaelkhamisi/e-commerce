import type { OrderStatus, PaymentMethod } from "src/types/order.types";
import type { IAddress } from "./address.interface";
import type { ICartItem } from "./cart-item.interface";

export interface IOrder {
  id: string;
  items: ICartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: IAddress;
  createdAt: string;
}
