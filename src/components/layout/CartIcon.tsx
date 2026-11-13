"use client";
import { useContext } from "react";
import { useTranslations } from "next-intl";
import { Link as NavLink } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";
import { CartContext } from "src/context/CartContextProvider";

export default function CartIcon() {
  const t = useTranslations("Header");
  const { numcartitem } = useContext(CartContext);

  return (
    <NavLink href="/cart" aria-label={t("cart")} className="relative rounded-full p-2.5 transition hover:bg-gray-100 dark:hover:bg-muted">
      <Icon src="/icons/header/cart.svg" width={25} height={20} />
      {numcartitem > 0 && (
        <span className="absolute -top-1 -inset-e-1 flex size-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
          {numcartitem}
        </span>
      )}
    </NavLink>
  );
}