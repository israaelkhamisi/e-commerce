export default function CardBrands() {
  return (
    <span className="mt-3 flex items-center gap-3">
      
      <span className="flex h-3.5 w-5.5 items-center justify-center rounded-sm bg-[#1A4FB0] text-[6.5px] font-extrabold italic text-white">
        VISA
      </span>

      
      <span className="relative flex h-3.5 w-5.5 items-center justify-center rounded-sm bg-gray-100">
        <span className="absolute left-1 size-2.25 rounded-full bg-[#EB001B]" />
        <span className="absoluteright-1 size-2.25 rounded-full bg-[#F79E1B] opacity-90" />
      </span>

      
      <span className="flex h-3.5 w-5.5 items-center justify-center rounded-sm bg-[#2E77BC] text-[5px] font-extrabold text-white">
        AMEX
      </span>
    </span>
  );
}