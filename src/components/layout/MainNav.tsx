import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";

const linkClass = "font-medium text-gray-700 hover:text-green-600 dark:text-foreground";

// Categories shown in the dropdown (ids from the API's /categories)
const menuCategories = [
  { id: "6439d2d167d9aa4ca970649f", name: "Electronics" },
  { id: "6439d58a0049ad0b52b9003f", name: "Women's Fashion" },
  { id: "6439d5b90049ad0b52b90048", name: "Men's Fashion" },
  { id: "6439d30b67d9aa4ca97064b1", name: "Beauty & Health" },
];

const itemClass =
  "block rounded-md px-4 py-2.5 text-gray-700 transition hover:bg-green-50 hover:text-green-600 dark:text-foreground dark:hover:bg-muted";

export default function MainNav() {
  const t = useTranslations("Header");

  return (
    <nav className="hidden shrink-0 items-center gap-6 lg:flex">
      <Link href="/" className={linkClass}>{t("home")}</Link>
      <Link href="/products" className={linkClass}>{t("shop")}</Link>

      {/* Dropdown opens on hover or keyboard focus */}
      <div className="group relative">
        <Link
          href="/categories"
          className={`${linkClass} flex items-center gap-1.5 py-2 group-hover:text-green-600 group-focus-within:text-green-600`}
        >
          {t("categories")}
          <Icon
            src="/icons/header/chevron-down.svg"
            width={12.5}
            height={10}
            className="transition group-hover:rotate-180 group-focus-within:rotate-180"
          />
        </Link>
        <div className="invisible absolute start-0 top-full z-50 w-60 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <ul className="rounded-xl border border-gray-100 bg-white p-2 shadow-lg dark:border-border dark:bg-card">
            <li>
              <Link href="/categories" className={itemClass}>{t("allCategories")}</Link>
            </li>
            {menuCategories.map((category) => (
              <li key={category.id}>
                <Link href={`/products?category=${category.id}`} className={itemClass}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link href="/brands" className={linkClass}>{t("brands")}</Link>
    </nav>
  );
}
