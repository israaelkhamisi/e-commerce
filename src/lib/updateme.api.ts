'use server'

import { getMyToken } from "./getMyToken"


export  async function updateMe(data : {name:string,email:string,phone:string}){
    const token = await getMyToken()
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,{
    method:'put',
    body:JSON.stringify(data),
    headers:{
        'content-type':'application/json',
        'token': token as string
    }
})
const respdata= await res.json()
return respdata
}