'use client'

import { createContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { GetWishlist } from "src/services/wishlist.services"


type WishlistContextType = {
  wishlistIds: string[];
  setWishlistIds: (ids: string[]) => void;
};

export const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  setWishlistIds: () => {},
});

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const { status } = useSession()

  useEffect(() => {
    if (status == 'authenticated') {
      getWishlistData()
    }
  }, [status])

  async function getWishlistData() {
    const res = await GetWishlist()
    if (res.status == 'success') {
      setWishlistIds(res.data.map((p: { _id: string }) => p._id))
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlistIds, setWishlistIds }}>{children}</WishlistContext.Provider>
  )
}
