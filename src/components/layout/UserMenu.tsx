"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link } from "src/i18n/routing";
import { CircleUserRound, User, Package, Heart, Contact, Settings, LogOut } from "lucide-react";

const items = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/allorders", label: "My Orders", icon: Package },
  { href: "/wishlist", label: "My Wishlist", icon: Heart },
  { href: "/profile/addresses", label: "Addresses", icon: Contact },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];


export default function UserMenu() {
  const { status, data } = useSession();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (status !== "authenticated") {
    return (
      <Link
        href="/login"
        aria-label="Sign in"
        className="rounded-full p-2.5 text-gray-600 transition hover:bg-gray-100 dark:text-foreground dark:hover:bg-muted"
      >
        <CircleUserRound className="size-6" />
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`rounded-full p-2 text-gray-600 transition hover:bg-gray-100 dark:text-foreground dark:hover:bg-muted ${
          open ? "ring-2 ring-gray-900 dark:ring-foreground" : ""
        }`}
      >
        <CircleUserRound className="size-7" />
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-border dark:bg-card">
          <div className="flex items-center gap-3 border-b border-gray-100 p-4 dark:border-border">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-muted">
              <CircleUserRound className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-900 dark:text-foreground">{data?.user?.name}</p>
              <p className="truncate text-sm text-gray-400">{data?.user?.email}</p>
            </div>
          </div>

          <ul className="py-2">
            {items.map(({ href, label, icon: ItemIcon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-green-600 dark:text-foreground dark:hover:bg-muted"
                >
                  <ItemIcon className="size-5 text-gray-400" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 py-2 dark:border-border">
            <button
              type="button"
             onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
              className="flex w-full items-center gap-3 px-5 py-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-muted"
            >
              <LogOut className="size-5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
