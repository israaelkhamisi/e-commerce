"use client";

import { useState } from "react";

/* eslint-disable @next/next/no-img-element -- remote API images */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3 rounded-xl bg-white p-5 shadow-sm dark:bg-card">
      {/* Main image: tall portrait like the design */}
      <img src={images[active]} alt={alt} className="aspect-[2/3] w-full object-cover" />
      {/* Thumbnails strip: scrolls sideways when they don't fit */}
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-[156px] w-[105px] shrink-0 overflow-hidden border-[3px] transition ${
              i === active ? "border-blue-600" : "border-transparent hover:opacity-80"
            }`}
          >
            <img src={src} alt={alt} className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
