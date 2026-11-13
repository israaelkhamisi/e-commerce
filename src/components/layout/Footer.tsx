import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import Icon from "src/components/shared/Icon";

// Pages that don't exist yet point to "/" for now
const columns = [
  {
    title: "shop",
    links: [
      { href: "/products", label: "allProducts" },
      { href: "/categories", label: "categories" },
      { href: "/brands", label: "brands" },
      { href: "/products", label: "electronics" },
      { href: "/products", label: "mensFashion" },
      { href: "/products", label: "womensFashion" },
    ],
  },
  {
    title: "account",
    links: [
      { href: "/profile", label: "myAccount" },
      { href: "/allorders", label: "orders" },
      { href: "/wishlist", label: "wishlist" },
      { href: "/cart", label: "cart" },
      { href: "/login", label: "signIn" },
      { href: "/register", label: "register" },
    ],
  },
  {
    title: "support",
    links: [
      { href: "/", label: "contact" },
      { href: "/", label: "help" },
      { href: "/", label: "shipping" },
      { href: "/", label: "returns" },
      { href: "/allorders", label: "trackOrder" },
    ],
  },
  {
    title: "legal",
    links: [
      { href: "/", label: "privacy" },
      { href: "/", label: "terms" },
      { href: "/", label: "cookies" },
    ],
  },
] as const;

const socials = ["facebook", "twitter", "instagram", "youtube"] as const;
const payments = ["visa", "mastercard", "paypal"] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tTop = useTranslations("TopBar");
  const tHeader = useTranslations("Header");

  return (
    <footer className="bg-gray-900 pt-12">
      <Container className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex rounded-lg bg-white px-4 py-2">
            <Icon src="/images/footer-logo.svg" width={165.16} height={32} alt={tHeader("brand")} />
          </Link>
          <p className="mt-[30px] text-sm leading-[22.75px] text-gray-400">{t("about")}</p>
          <div className="mt-6 space-y-3 text-sm text-gray-400">
            <a href={`tel:${tTop("phone")}`} className="flex items-center gap-3 hover:text-white">
              <Icon src="/icons/footer/phone.svg" width={17.5} height={14} />
              <span dir="ltr">{tTop("phone")}</span>
            </a>
            <a href={`mailto:${tTop("email")}`} className="flex items-center gap-3 hover:text-white">
              <Icon src="/icons/footer/envelope.svg" width={17.5} height={14} />
              {tTop("email")}
            </a>
            <p className="flex items-start gap-3">
              <Icon src="/icons/footer/map-pin.svg" width={17.5} height={14} className="mt-0.5" />
              {t("address")}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            {socials.map((name) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="flex size-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-green-600"
              >
                <Icon src={`/icons/footer/${name}.svg`} width={20} height={16} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-lg font-semibold text-white">{t(col.title)}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label} className="pt-[3px] pb-px">
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="mt-12 border-t border-gray-800 pt-[25px] pb-6">
        <Container className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {tHeader("brand")}. {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            {payments.map((name) => (
              <span key={name} className="flex items-center gap-2">
                <Icon src="/icons/footer/credit-card.svg" width={17.5} height={14} />
                {t(name)}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
