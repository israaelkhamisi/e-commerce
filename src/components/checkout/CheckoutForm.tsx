"use client";
import { useTranslations } from "next-intl";
import { Banknote, Building2, Check, CreditCard, House, Info, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useForm,Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, checkouttype } from "src/lib/checkout.schema";
import { PaymentOrder,CashOrder } from "src/services/cart.services";
import { toast } from "react-hot-toast";
import { useRouter } from "src/i18n/routing";
import { useContext, useState } from "react";
import { CartContext } from "src/context/CartContextProvider";
import SavedAddresses from "./SavedAddresses";
import type { IAddress } from "src/interfaces/address.interface";
import {GetMyAddress} from 'src/services/addresses.services'
import CardBrands from "./CardBrands";

export type PaymentType = "cash" | "online";
export default function CheckoutForm({cartId, payment, setPayment, addresses}: {
  cartId: string;
  addresses: IAddress[];
  payment: PaymentType;
  setPayment: (p: PaymentType) => void;
}) {
  const t = useTranslations("CheckoutPage");
  const router = useRouter();
const { setnumbercartitem } = useContext(CartContext);

  const [selectedId, setSelectedId] = useState("new");

  const { handleSubmit,register,control,setValue } = useForm<checkouttype>({
    defaultValues:{
       city:'',
    phone:'',
    details:''
    },
   resolver: zodResolver(checkoutSchema),

  });


  const inputBox =
    "flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 transition focus-within:border-green-600 dark:border-gray-700 dark:bg-gray-900";
  const iconBox = "flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800";


  async function handleSelectAddress(id: string) {
    setSelectedId(id);
    if(id === 'new'){
      setValue("city", "")
   setValue("details", "");
    setValue("phone", "");
  }else{
 const res = await GetMyAddress(id);
 setValue("city", res.data.city);
    setValue("details", res.data.details);
    setValue("phone", res.data.phone);

  }
  }
 async function handlePayment(value: checkouttype) {
  if (payment === "cash") {
    const res = await CashOrder(value, cartId);
    if (res.status === "success") {
      toast.success(res.message);
      setnumbercartitem(0);
      router.push("/allorders");
    }
  } else {
    const res = await PaymentOrder(value, cartId);
    if (res.status === "success") {
      window.location.href=(res.session.url);
    }
  }
}
  return (
    <form id="checkout-form" className="space-y-8" onSubmit={handleSubmit(handlePayment)}>
     
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <header className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4 text-white">
          <h2 className="flex items-center gap-3 text-xl font-bold">
            <House className="size-5" />
            {t("shippingAddress")}
          </h2>
          <p className="mt-1 text-green-50">{t("shippingHint")}</p>
        </header>

        <div className="space-y-6 p-8">
          {addresses.length > 0 && (
            <SavedAddresses addresses={addresses} selectedId={selectedId} onSelect={handleSelectAddress} />
          )}

          <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900">
              <Info className="size-5" />
            </span>
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-200">{t("deliveryInfo")}</p>
              <p className="text-sm text-blue-600 dark:text-blue-300">{t("deliveryInfoText")}</p>
            </div>
          </div>

<Controller
  name="city"
  control={control}
  render={({ field, fieldState }) => (
  <label className="block space-y-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {t("city")} <span className="text-red-500">*</span>
            </span>
            <span className={inputBox}>
              <span className={iconBox}>
                <Building2 className="size-5" />
              </span>
              <input {...field} name="city" required placeholder={t("cityPlaceholder")} className="w-full bg-transparent py-4 text-lg outline-none" />
            </span>
            {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
          </label>
  )}
/>
        <Controller
  name="details"
  control={control}
  render={({ field, fieldState }) => (
      <label className="block space-y-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {t("street")} <span className="text-red-500">*</span>
            </span>
            <span className={`${inputBox} items-start py-3`}>
              <span className={iconBox}>
                <MapPin className="size-5" />
              </span>
              <textarea 
              {...field}
                name="details"
                required
                rows={3}
                placeholder={t("streetPlaceholder")}
                className="w-full resize-none bg-transparent py-1 text-lg outline-none"
              />
            </span>
            {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
          </label>
  )}
/>

      <Controller
  name="phone"
  control={control}
  render={({ field, fieldState }) => (
    <label className="block space-y-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {t("phone")} <span className="text-red-500">*</span>
            </span>
            <span className={inputBox}>
              <span className={iconBox}>
                <Phone className="size-5" />
              </span>
              <input {...field} name="phone" type="tel" required placeholder="01xxxxxxxxx" className="w-full bg-transparent py-4 text-lg outline-none" />
              <span className="shrink-0 text-sm text-gray-400">{t("phoneHint")}</span>
            </span>
            {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
          </label>
  )}
/> 

         
        </div>
      </section>

 
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <header className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
          <h2 className="flex items-center gap-3 text-xl font-bold">
            <CreditCard className="size-5" />
            {t("payment")}
          </h2>
          <p className="mt-1 text-green-50">{t("paymentHint")}</p>
        </header>

        <div className="space-y-5 p-8">
          <PaymentOption
            selected={payment === "cash"}
            onSelect={() => setPayment("cash")}
            icon={<Banknote className="size-7" />}
            title={t("cash")}
            text={t("cashText")}
          />
          <PaymentOption
            selected={payment === "online"}
            onSelect={() => setPayment("online")}
            icon={<CreditCard className="size-7" />}
            title={t("online")}
            text={t("onlineText")}
            
         extra={<CardBrands />}
          />

          <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">{t("secureTitle")}</p>
              <p className="text-sm text-green-600 dark:text-green-300">{t("secureText")}</p>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

function PaymentOption({
  selected,
  onSelect,
  icon,
  title,
  text,
  extra,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  text: string;
  extra?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-5 rounded-xl border-2 p-6 text-start transition ${
        selected ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-gray-200 hover:border-green-300 dark:border-gray-700"
      }`}
    >
      <span
        className={`flex size-16 shrink-0 items-center justify-center rounded-xl ${
          selected ? "bg-green-600 text-white shadow-lg shadow-green-600/30" : "bg-gray-100 text-gray-500 dark:bg-gray-800"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className={`block text-lg font-semibold ${selected ? "text-green-700 dark:text-green-400" : "text-gray-900 dark:text-gray-100"}`}>
          {title}
        </span>
        <span className="block text-gray-500">{text}</span>
        {extra}
      </span>
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-green-600 bg-green-600 text-white" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        {selected && <Check className="size-4" />}
      </span>
    </button>
  );
}
