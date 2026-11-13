'use server'

import { getMyToken } from "./getMyToken"



export  async function ChangePassword(data : {currentPassword:string,password:string,rePassword:string}){
    const token = await getMyToken()
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/changeMyPassword`,{
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