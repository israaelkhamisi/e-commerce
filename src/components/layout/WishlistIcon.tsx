'use client'

import { useContext } from "react"
import { useTranslations } from "next-intl"
import { Link } from "src/i18n/routing"
import Icon from "src/components/shared/Icon"
import { WishlistContext } from "src/context/WishlistContextProvider"

// Heart in the header with a red badge (number of saved products)
export default function WishlistIcon() {
  const t = useTranslations("Header")
  const { wishlistIds } = useContext(WishlistContext)

  return (
    <Link
      href="/wishlist"
      aria-label={t("wishlist")}
      className="relative rounded-full p-2.5 transition hover:bg-gray-100 dark:hover:bg-muted"
    >
      <Icon src="/icons/header/heart.svg" width={25} height={20} />
      {wishlistIds.length > 0 && (
        <span className="absolute -inset-e-1 top-0 flex size-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
          {wishlistIds.length}
        </span>
      )}
    </Link>
  )
}
