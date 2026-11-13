import Icon from "./Icon";

export default function RatingStars({ rating, count }: { rating: number; count?: number }) {
  const full = Math.floor(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex pt-[3px] pb-[5px]" aria-label={`${rating} / 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Icon
            key={i}
            src={i < full ? "/icons/product/star-full.svg" : "/icons/product/star-empty.svg"}
            width={20}
            height={16}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-muted-foreground">
        {rating}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
