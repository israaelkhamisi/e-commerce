'use server'


import { cookies } from "next/headers";

export  async function forgotPassword(email: string){
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,{
    method:'post',
    body:JSON.stringify({email : email}),
    headers:{
        'content-type':'application/json'
    }
})
const respdata= await res.json()
if (respdata.statusMsg === "success") {
  const myCookies = await cookies();
  myCookies.set("resetEmail", email,
     { httpOnly: true, maxAge: 60 * 10 });
}
return respdata
}