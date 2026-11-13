"use client";
import { useTranslations } from "next-intl";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link as NavLink, useRouter } from "src/i18n/routing";
import { ClearProductFromCart } from "src/services/cart.services";
import { useContext } from "react";
import { toast } from 'react-hot-toast';
import { CartContext } from "src/context/CartContextProvider";

export default function CartActions() {
  const t = useTranslations("CartPage");
  const router = useRouter();
const { setnumbercartitem } = useContext(CartContext);

async function handleClear() {
  const res = await ClearProductFromCart()
  console.log("clear", res)
  if(res.status == 'success'){
    toast.success(res.message)
     router.refresh()
     setnumbercartitem(0)
 
  }
 
}

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
      <NavLink href="/products" className="flex items-center gap-2 font-medium text-green-600 hover:text-green-700">
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("continueShopping")}
      </NavLink>

      <button
onClick={handleClear}
       type="button" className="flex items-center gap-2 text-gray-400 transition hover:text-red-500">
        <Trash2 className="size-4" />
        {t("clearAll")}
      </button>
    </div>
  );
}