"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import Icon from "src/components/shared/Icon";
import { useCarousel } from "src/hooks/useCarousel";

const SLIDES = 3;
const INTERVAL_MS = 5000;

export default function HeroSlider() {
  const t = useTranslations("HomePage");
  // Autoplay pauses on hover
  const { active, goTo, next, prev, pause, resume } = useCarousel(SLIDES, INTERVAL_MS);

  return (
    <section
      className="relative h-[400px] overflow-hidden"
      aria-roledescription="carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Sliding track: moves left in LTR, right in RTL */}
      <div
        className="flex h-full translate-x-[calc(var(--slide)*-100%)] transition-transform duration-300 ease-out rtl:translate-x-[calc(var(--slide)*100%)]"
        style={{ "--slide": active } as CSSProperties}
      >
      {Array.from({ length: SLIDES }, (_, i) => (
        <div
          key={i}
          aria-hidden={i !== active}
          className={`relative h-full w-full shrink-0 ${i === active ? "" : "pointer-events-none"}`}
        >
          <Image src="/images/home/hero.png" alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-green-500/90 to-green-400/50 rtl:bg-gradient-to-l">
            {/* Figma: slide text shows on desktop only */}
            <Container className="hidden space-y-4 sm:px-20 lg:block 2xl:px-4">
              <h2 className="max-w-96 text-3xl font-bold leading-9 text-white">{t("heroTitle")}</h2>
              <p className="font-medium text-white">{t("heroText")}</p>
              <div className="flex flex-wrap gap-2 pt-0.5">
                <Link
                  href="/products"
                  className="rounded-lg border-2 border-white/50 bg-white px-[26px] py-2.5 font-semibold text-green-500 transition hover:scale-105"
                >
                  {t("shopNow")}
                </Link>
                <Link
                  href="/deals"
                  className="rounded-lg border-2 border-white/50 px-[26px] py-2.5 font-semibold text-white transition hover:bg-white/10"
                >
                  {t("viewDeals")}
                </Link>
              </div>
            </Container>
          </div>
        </div>
      ))}
      </div>

      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2 pt-[5px] pb-[7px]">
        {Array.from({ length: SLIDES }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={t("goToSlide", { number: i + 1 })}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`h-3 rounded-md transition-all ${i === active ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={t("previousSlide")}
        onClick={prev}
        className="absolute start-4 top-1/2 hidden size-12 sm:flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 hover:bg-white"
      >
        <Icon src="/icons/home/slider-prev.svg" width={22.5} height={18} className="rtl:-scale-x-100" />
      </button>
      <button
        type="button"
        aria-label={t("nextSlide")}
        onClick={next}
        className="absolute end-4 top-1/2 hidden size-12 sm:flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 hover:bg-white"
      >
        <Icon src="/icons/home/slider-next.svg" width={22.5} height={18} className="rtl:-scale-x-100" />
      </button>
    </section>
  );
}
