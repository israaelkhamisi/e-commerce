'use server'

import { getMyToken } from "src/lib/getMyToken"

 export async function addTocart(id:string){
    const token =await getMyToken()
    const res =await fetch(`${process.env.BASE_URL}/api/v2/cart`,{
        method:'post',
        body:JSON.stringify({productId:id}),
        headers:{
            'Content-Type':'application/json',
            'token': token as string
        }
    })
    const data =await res.json()
    return data

}

export async function GetAllCartItem(){
const token = await getMyToken()
const res =await fetch(`${process.env.BASE_URL}/api/v2/cart`,{
    headers:{
        'token' :token as string
    },
      cache: "no-store"
})
const data = await res.json()
return data
}


export async function DeletProductFromCart(id:string){
    const token = await getMyToken()
    const res= await fetch(`${process.env.BASE_URL}/api/v2/cart/${id}`,{
        method: "DELETE",
       headers:{
        'token' :token as string
    }
    })
    const data = await  res.json()
    return data
}
export async function ClearProductFromCart(){ 
     const token = await getMyToken()
    const res= await fetch(`${process.env.BASE_URL}/api/v2/cart`,{
        method: "DELETE",
       headers:{
        'token' :token as string
    }
    })
    const data = await res.json()
    return data
}
   
export async function UpdateCartItem(count:number,id:string){
      const token = await getMyToken()
      const res= await fetch(`${process.env.BASE_URL}/api/v2/cart/${id}`,{
        method:'put',
        body:JSON.stringify({count:count}),
        headers:{
            'token': token as string,
            'content-type' : 'application/json'
        }
    
      })
      const data = await res.json()
      return data

}
export async function PaymentOrder(obj:{details:string,phone:string,city:string},cartId:string){
const token = await getMyToken()
const address = {
   shippingAddress:obj
}
const res = await fetch(`${process.env.BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-4n2c.vercel.app/en`,{
    method:'post',
    body:JSON.stringify(address),
    headers:{
        'token': token as string,
        'content-type':'application/json'
    }
})
 const data =  await res.json()
      return data

}
export async function CashOrder(obj:{details:string,phone:string,city:string},cartId:string){
const token = await getMyToken()
const address = {
   shippingAddress:obj
}
const res = await fetch(`${process.env.BASE_URL}/api/v2/orders/${cartId}`,{
    method:'post',
    body:JSON.stringify(address),
    headers:{
        'token': token as string,
        'content-type':'application/json'
    }
})
 const data =  await res.json()
      return data

}
export async function getUserOrders(id: string){
     const token = await getMyToken()
     
     const res = await fetch(`${process.env.BASE_URL}/api/v1/orders/user/${id}`,{
    headers:{
        'token': token as string,
    }
})
    const data =  await res.json()
      return data
}






export async function GetAllOrders(){
    const token = await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/orders/`,{
    headers:{
        'token': token as string,
    }
})
 const data =  await res.json()
      return data
}


export async function ApplyCopun(couponName:string){
      const token = await getMyToken()
      const res= await fetch(`${process.env.BASE_URL}/api/v2/cart/applyCoupon`,{
        method:'put',
        body:JSON.stringify({couponName}),
        headers:{
            'token': token as string,
            'content-type' : 'application/json'
        }
    
      })
      const data = await res.json()
      return data

}