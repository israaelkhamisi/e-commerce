import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import type { product as Product } from "src/types/product.t";
import Icon from "./Icon";
import RatingStars from "./RatingStars";
import PriceTag from "./PriceTag";
import AddBtnWishlist from "./AddBtnWishlist";

import  Image  from "next/image";
import AddBtnCart from "./AddBtnCart";
const actionClass =
  "flex size-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 dark:bg-muted";

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("Common");
  const discount = product.priceAfterDiscount
    ? Math.round((1 - product.priceAfterDiscount / product.price) * 100)
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-border dark:bg-card">
      <div className="relative h-60 overflow-hidden bg-white">
        <Link href={`/products/${product.id}`} className="absolute inset-0">
         
                
<Image
            
src={product.imageCover}
            
alt={product.title}
            
fill 
sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 100vw" className="object-contain transition duration-500 group-hover:scale-105"
          
/>
        </Link>
        {discount > 0 && (
          <span className="absolute start-3 top-[13px] rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
            -{discount}%
          </span>
        )}
        <div className="absolute inset-e-3 top-3 flex flex-col gap-2">
       <AddBtnWishlist id={product.id} />
          <button type="button" aria-label={t("compare")} className={actionClass}>
            <Icon src="/icons/product/compare.svg" width={20} height={16} />
          </button>
          <Link href={`/products/${product.id}`} aria-label={t("quickView")} className={actionClass}>
            <Icon src="/icons/product/eye.svg" width={20} height={16} />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs text-gray-500 dark:text-muted-foreground">{product.category?.name}</span>
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 font-medium text-gray-700 hover:text-green-600 dark:text-foreground"
        >
          {product.title}
        </Link>
        <RatingStars rating={product.ratingsAverage} count={product.ratingsQuantity} />
        <div className="mt-auto flex items-center justify-between pt-1">
          <PriceTag
            price={product.priceAfterDiscount ?? product.price}
            oldPrice={product.priceAfterDiscount ? product.price : undefined}
          />
          <AddBtnCart id={product.id}/>
        </div>
      </div>
    </article>
  );
}
