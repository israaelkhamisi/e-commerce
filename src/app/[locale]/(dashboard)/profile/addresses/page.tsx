import { getTranslations, setRequestLocale } from "next-intl/server";
import AddressCard from "src/components/account/AddressCard";
import AddressesEmpty from "src/components/account/AddressesEmpty";
import AddAddressButton from "src/components/account/AddAddressButton";
import type { IAddress } from "src/interfaces/address.interface";
import {GetAllAddress} from 'src/services/addresses.services'

export default async function AddressesPage({ params }: PageProps<"/[locale]/profile/addresses">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AccountPage");



const data= await GetAllAddress()
const addresses: IAddress[]= data.data
  

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t("addresses")}</h2>
          <p className="mt-1 text-sm font-medium text-gray-500">{t("addressesText")}</p>
        </div>
        <AddAddressButton label={t("addAddress")} />
      </div>

      {addresses.length === 0 ? (
        <AddressesEmpty />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      )}
    </>
  );
}
