
'use server'
import { cookies } from 'next/headers'
import { LoginType } from 'src/lib/schemas/login.schema'

export async function loginApi(data: LoginType) {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{
    method:'post',
    body:JSON.stringify(data),
    headers:{
        'content-type':'application/json'
    }
})
const respdata= await res.json()
const mycookiees= await cookies()
mycookiees.set('user',respdata.token,{
    httpOnly:true,
    maxAge:60
})

return respdata
}