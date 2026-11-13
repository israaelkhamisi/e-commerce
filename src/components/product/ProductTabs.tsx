"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Package, Pencil, RotateCcw, ShieldCheck, Star, Truck, type LucideIcon } from "lucide-react";
import RatingStars from "src/components/shared/RatingStars";
import type { product as Product } from "src/types/product.t";
import { toast } from "react-hot-toast";
import { useRouter } from "src/i18n/routing";
import { CreateReview } from "src/services/reviews.services";
import {DeletReview,UpdateReview} from 'src/services/reviews.services'
import {Trash2,pencil} from 'lucide-react'

type Tab = "details" | "reviews" | "shipping";

type Review = {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: { _id: string; name: string };
};
const tabs: { id: Tab; icon: LucideIcon }[] = [
  { id: "details", icon: Package },
  { id: "reviews", icon: Star },
  { id: "shipping", icon: Truck },
];


const features = ["feature1", "feature2", "feature3", "feature4"] as const;
const shippingPoints = ["shipping1", "shipping2", "shipping3", "shipping4"] as const;
const returnPoints = ["returns1", "returns2", "returns3", "returns4"] as const;


const ratingBars = [
  { stars: 5, percent: 25 },
  { stars: 4, percent: 60 },
  { stars: 3, percent: 25 },
  { stars: 2, percent: 5 },
  { stars: 1, percent: 5 },
];

export default function ProductTabs({ product ,reviews,userId}: { product: Product,reviews:Review[] ,userId: string|undefined}) {
  const t = useTranslations("ProductTabs");
  const [active, setActive] = useState<Tab>("details");
  const router = useRouter();
const [text, setText] = useState("");
const [rating, setRating] = useState(5);
const [editingId, setEditingId] = useState<string | null>(null);
function startEdit(r: Review) {
  setEditingId(r._id);
  setText(r.review);
  setRating(r.rating);
}

async function handleReview(e: React.FormEvent) {
  e.preventDefault()

  const res = editingId? await UpdateReview(editingId, text, rating): await CreateReview(product.id, text, rating);
    if (res.status === "success" || res.data) {
    toast.success("Review added");
    setText("");
    router.refresh();
    setEditingId(null)
  } else {
    toast.error(res.message);
  }
}

  const info = [
    { label: t("category"), value: product.category?.name },
    { label: t("subcategory"), value: product.subcategory?.map((s) => s.name).join(", ") },
    { label: t("brand"), value: product.brand?.name },
    { label: t("itemsSold"), value: t("sold", { count: product.sold }) },
  ];
  async function handleDelete(reviewId: string){
    const res = await  DeletReview(reviewId)
    if(res.ok){
      toast.success("Review deleted")
      router.refresh()

    }

  }

  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-card">
      <div className="border-b border-gray-200 dark:border-border">
        <div className="flex overflow-x-auto scrollbar-none">
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium transition-all duration-200 ${
                active === id
                  ? "border-b-2 border-green-600 bg-green-50/50 text-green-600 dark:bg-green-950/30"
                  : "text-gray-600 hover:bg-gray-50 hover:text-green-600 dark:text-muted-foreground dark:hover:bg-muted"
              }`}
            >
              <Icon className={`size-4 ${id === "details" || id === "reviews" ? "fill-current" : ""}`} />
              {id === "reviews" ? t("reviews", { count: reviews.length }) : t(id)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {active === "details" && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-foreground">{t("about")}</h3>
              <p className="whitespace-pre-line leading-relaxed text-gray-600 dark:text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-muted">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-foreground">{t("information")}</h4>
                <ul className="space-y-2">
                  {info.map((row) => (
                    <li key={row.label} className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500 dark:text-muted-foreground">{row.label}</span>
                      <span className="text-end font-medium text-gray-900 dark:text-foreground">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-muted">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-foreground">{t("keyFeatures")}</h4>
                <ul className="space-y-2">
                  {features.map((key) => (
                    <li key={key} className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                      <Check className="size-4 text-green-600" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {active === "reviews" && (
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-gray-900 dark:text-foreground">{product.ratingsAverage}</div>
                <div className="flex justify-center">
                  <RatingStars rating={product.ratingsAverage} />
                </div>
                <p className="mt-2 text-sm text-gray-500">{t("basedOn", { count:  reviews.length })}</p>
              </div>
              <div className="w-full flex-1">
                {ratingBars.map(({ stars, percent }) => (
                  <div key={stars} className="mb-2 flex items-center gap-3">
                    <span className="w-8 text-sm text-gray-600 dark:text-muted-foreground">{t("star", { count: stars })}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-muted">
                      <div className="h-full rounded-full bg-yellow-400 transition-all duration-300" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="w-10 text-sm text-gray-500">{percent}%</span>
                  </div>
                ))}
              </div>
            </div>
  <form onSubmit={handleReview} className="mb-6 space-y-3 rounded-lg border border-gray-200 p-4 dark:border-border">
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => setRating(n)}>
        <Star className={`size-6 ${n <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      </button>
    ))}
  </div>
  <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Write your review..."
    className="w-full rounded-lg border border-gray-200 p-3 dark:border-border dark:bg-muted"
    rows={3}
  />
  <button type="submit" className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700">
    Submit Review
  </button>
</form>
            <ul className="space-y-4">
  {reviews.map((review) => (
    <li key={review._id} className="rounded-lg bg-gray-50 p-4 dark:bg-muted">
      <div className="mb-2 flex items-center justify-between ">
        <span className="font-medium text-gray-900 dark:text-foreground">{review.user.name}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
        {review.user._id === userId && (
          <>
  <button type="button" onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-600">
    <Trash2 className="size-4" />
  </button>
  <button type="button" onClick={() => startEdit(review)} className="text-gray-500 hover:text-green-600">
  <Pencil className="size-4" />
</button>

</>

)}
</div>
      </div>
      <RatingStars rating={review.rating} />
      <p className="mt-2 text-gray-600 dark:text-muted-foreground">{review.review}</p>
    </li>
  ))}
</ul>
          </div>
        )}

        {active === "shipping" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoCard icon={Truck} title={t("shippingTitle")} points={shippingPoints.map((key) => t(key))} />
              <InfoCard icon={RotateCcw} title={t("returnsTitle")} points={returnPoints.map((key) => t(key))} />
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-6 dark:bg-muted">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900 dark:text-foreground">{t("protectionTitle")}</h4>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">{t("protectionText")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, points }: { icon: LucideIcon; title: string; points: string[] }) {
  return (
    <div className="rounded-lg bg-linear-to-br from-green-50 to-green-100 p-6 dark:from-green-950/40 dark:to-green-900/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-green-600 text-white">
          <Icon className="size-5" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-foreground">{title}</h4>
      </div>
      <ul className="space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-gray-700 dark:text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
