'use server'

import { cookies } from "next/headers";




export  async function resetPassword(newPassword:string){
    const myCookies = await cookies();
const email = myCookies.get("resetEmail")?.value;
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,{
    method:'put',
    body:JSON.stringify({ email,newPassword
        }),
    headers:{
        'content-type':'application/json'
    }
})
const respdata= await res.json()
return respdata
}