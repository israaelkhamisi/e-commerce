"use client";
import { useState } from "react";
import CheckoutForm, { type PaymentType } from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import type { CartProduct } from "src/interfaces/cart.interface";
import type { IAddress } from "src/interfaces/address.interface";

// Holds the selected payment method so the form and the summary button both see it
export default function CheckoutClient({
  cartId,
  products,
  count,
  total,
  addresses,
}: {
  cartId: string;
  products: CartProduct[];
  count: number;
  total: number;
  addresses: IAddress[];
}) {
  const [payment, setPayment] = useState<PaymentType>("cash");

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_26rem]">
      <CheckoutForm cartId={cartId} payment={payment} setPayment={setPayment} addresses={addresses} />
      <CheckoutSummary products={products} count={count} total={total} payment={payment} />
    </div>
  );
}
