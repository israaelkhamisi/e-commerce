import Image from "next/image";
import { cn } from "src/lib/utils";

// Static SVG/PNG icon exported from the Figma design (lives in /public)
export default function Icon({
  src,
  width,
  height,
  alt = "",
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      unoptimized
      className={cn("shrink-0", className)}
    />
  );
}
