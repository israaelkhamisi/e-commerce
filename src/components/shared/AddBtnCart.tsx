'use client'


import Icon from './Icon'
import { useTranslations } from 'next-intl';
import { addTocart } from 'src/services/cart.services';
import { toast } from 'react-hot-toast';
import { useContext } from 'react'
import {CartContext } from "src/context/CartContextProvider"

export default   function AddBtnCart({id}:{id:string}) {
  const {setnumbercartitem}=useContext( CartContext)
 
    const t = useTranslations('Common')
     async function handleAdd(){
        const data= await addTocart(id)
       if (data.status === "success") {
  toast.success(data.message)
  setnumbercartitem(data.numOfCartItems)
} else {
  toast.error(data.message)
}
      
    }

  return (
              <button
              onClick={handleAdd}
                type="button"
                aria-label={t("addToCart")}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 transition hover:scale-110 hover:bg-green-700"
              >
                <Icon src="/icons/product/plus.svg" width={20} height={16} />
              </button>
  )
}
