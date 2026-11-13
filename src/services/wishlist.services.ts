'use server'

import { getMyToken } from "src/lib/getMyToken"


export async function addTowishlist(id:string){
const token =await getMyToken()
const res =await fetch(`${process.env.BASE_URL}/api/v1/wishlist`,{
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
export async function DeletFromWishlist(id:string){
const token =await getMyToken()
const res =await fetch(`${process.env.BASE_URL}/api/v1/wishlist/${id}`,{
    method:'delete',
    headers:{
        'token': token as string
    }
})
const data =await res.json()
return data


}


export async function GetWishlist(){
const token =await getMyToken()
const res =await fetch(`${process.env.BASE_URL}/api/v1/wishlist`,{
    method:'get',
    headers:{
        'token': token as string
    },cache: "no-store"
})
const data =await res.json()
return data


}
