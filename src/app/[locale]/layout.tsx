import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "src/i18n/routing";
import { getDirection } from "src/i18n/config";
import ThemeProvider from "src/providers/ThemeProvider";
import Header from "src/components/layout/Header";
import FeaturesStrip from "src/components/layout/FeaturesStrip";
import Footer from "src/components/layout/Footer";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import  MySessionProvider  from "src/components/layout/MySessionProvider";
import CartContextProvider from "src/context/CartContextProvider"
import WishlistContextProvider from "src/context/WishlistContextProvider"

// Exo is the design font; Cairo covers Arabic text
const exo = localFont({
  src: [
    { path: "../fonts/exo-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/exo-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-exo",
});

const cairo = localFont({
  src: "../fonts/cairo-arabic-wght-normal.woff2",
  weight: "200 1000",
  variable: "--font-cairo",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      suppressHydrationWarning
      className={`${exo.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <MySessionProvider>
        <CartContextProvider>
        <WishlistContextProvider>
          <NextIntlClientProvider>
          <ThemeProvider>
            <Header />
         
            <main className="flex-1">{children}</main>
            <FeaturesStrip />
            <Toaster />
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        </WishlistContextProvider>
        </CartContextProvider>
      </MySessionProvider>
      </body>
    </html>
  );
}
