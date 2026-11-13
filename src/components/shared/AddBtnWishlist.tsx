'use client'

import { useContext, useState } from 'react'
import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { addTowishlist, DeletFromWishlist } from 'src/services/wishlist.services'
import { WishlistContext } from 'src/context/WishlistContextProvider'

export default function AddBtnWishlist({ id }: { id: string }) {
  const t = useTranslations('Common')
  const { wishlistIds, setWishlistIds } = useContext(WishlistContext)
  const [loading, setLoading] = useState(false)


  const liked = wishlistIds.includes(id)

  async function handleClick() {
    setLoading(true)
    const data = liked ? await DeletFromWishlist(id) : await addTowishlist(id)
    setLoading(false)

    if (data.status === 'success') {
      toast.success(data.message)
      setWishlistIds(data.data)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      type="button"
      aria-label={t('addToWishlist')}
      aria-pressed={liked}
      className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 disabled:opacity-60 dark:bg-muted"
    >
      <Heart className={`size-4 transition ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
    </button>
  )
}
