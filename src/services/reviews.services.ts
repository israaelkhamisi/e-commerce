'use server'

import { getMyToken } from "src/lib/getMyToken"






 export async function CreateReview(productid:string , review: string, rating: number){
    const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/products/${productid}/reviews`,{
    method:'post',
    body:JSON.stringify({review,rating}),
headers:{
    'content-type':'application/json',
    'token': token as string
}
} )
const data = await res.json()
return data

 }

  export async function GetProductReviews(id:string){
const res = await fetch(`${process.env.BASE_URL}/api/v1/products/${id}/reviews`,{
headers:{
    'content-type':'application/json',
}
} )
const data = await res.json()
return data

 }
 export async function GetAllReviews(){
  const res = await fetch(`${process.env.BASE_URL}/api/v1/reviews`)
  const data = await res.json()
  return data
}

export async function GetReviewById(reviewId: string){
  const res = await fetch(`${process.env.BASE_URL}/api/v1/reviews/${reviewId}`)
  const data = await res.json()
  return data
}

export async function UpdateReview(reviewId: string, review: string, rating: number){
     const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/reviews/${reviewId}`,{
    method:'put',
    body:JSON.stringify({review,rating}),
headers:{
    'content-type':'application/json',
    'token': token as string
}
})
 const data = await res.json()
  return data
}

export async function DeletReview(reviewId: string){
     const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/reviews/${reviewId}`,{
    method:'delete',
headers:{
    'token': token as string
}
})
  return { ok: res.ok }
}