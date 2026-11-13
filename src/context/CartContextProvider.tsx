'use client'

import { createContext, useEffect, useState } from "react"
import { GetAllCartItem } from "src/services/cart.services";
import type { CartResponse } from "src/interfaces/cart.interface";
import { useSession } from "next-auth/react";
type CartContextType = {
  numcartitem: number;
  setnumbercartitem: (n: number) => void;
};export const CartContext = createContext<CartContextType>({ numcartitem: 0, setnumbercartitem: () => {},
});
export default function CartContextProvider({children}:{children:React.ReactNode}) {
    const[numcartitem,setnumbercartitem]= useState<number>(0)
const { status } = useSession()

    useEffect(()=>{
      if(status == 'authenticated'){
        getCartData()
      }

    },[status])
   async function getCartData(){
     const res:CartResponse = await GetAllCartItem()
     setnumbercartitem(res.numOfCartItems)
    }
  return (
<CartContext.Provider value={{numcartitem,setnumbercartitem}}>{children}</CartContext.Provider>
  )
}
