import { use } from "react";
import { redirect } from "src/i18n/routing";

// /profile opens the settings tab
export default function ProfilePage({ params }: PageProps<"/[locale]/profile">) {
  const { locale } = use(params);
  redirect({ href: "/profile/settings", locale });
}
