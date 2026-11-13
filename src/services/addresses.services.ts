'use server'

import { getMyToken } from "src/lib/getMyToken"


export async function AddAddress(name:string ,details:string,phone:string,city:string){
     const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/addresses`,{
    method:'post',
    body:JSON.stringify({name,details,phone,city}),
headers:{
    'content-type':'application/json',
    'token': token as string
}
})
 const data = await res.json()
  return data
}
export async function RemoveAddress(id: string){
     const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/addresses/${id}`,{
    method:'delete',
   
headers:{
    'token': token as string
}
})
 const data = await res.json()
  return data
}
export async function GetMyAddress(id: string){
     const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/addresses/${id}`,{
   
headers:{
    'token': token as string
}
})
 const data = await res.json()
  return data
}

export async function GetAllAddress(){
     const token=  await getMyToken()
const res = await fetch(`${process.env.BASE_URL}/api/v1/addresses`,{
   
headers:{
    'token': token as string
},
cache: "no-store"
})
 const data = await res.json()
  return data
}