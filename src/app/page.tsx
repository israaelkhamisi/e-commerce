import { redirect } from "next/navigation";
import { defaultLocale } from "src/i18n/config";

// Fallback in case the proxy doesn't run on "/"
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
