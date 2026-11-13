

import { getTranslations, setRequestLocale } from "next-intl/server";
import ProfileForm from "src/components/account/ProfileForm";
import ChangePasswordForm from "src/components/account/ChangePasswordForm";
import { VerifyToken } from "src/lib/verifytoken.api";
import { getAllUser } from "src/lib/getalluser.api";

export default async function SettingsPage({ params }: PageProps<"/[locale]/profile/settings">) {
  const { locale } = await (params);
  setRequestLocale(locale);
  const t =  await getTranslations("AccountPage");
const data = await VerifyToken();
const users = await getAllUser();
console.log("users", users);
  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t("settingsTitle")}</h2>
        <p className="mt-1 text-sm font-medium text-gray-500">{t("settingsText")}</p>
      </div>
      <ProfileForm userId={data.decoded?.id} role={data.decoded?.role} />
      <ChangePasswordForm />
    </>
  );
}
