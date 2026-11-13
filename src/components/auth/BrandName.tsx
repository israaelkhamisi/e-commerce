// "FreshCart" word logo: green "Fresh" + dark "Cart"
export default function BrandName({ className }: { className?: string }) {
  return (
    <span dir="ltr" className={className}>
      <span className="text-green-600">Fresh</span>
      <span className="text-gray-800 dark:text-gray-100">Cart</span>
    </span>
  );
}
