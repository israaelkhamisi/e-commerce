'use server'

import { getMyToken } from "./getMyToken"

export async function VerifyToken() {
    const token = await getMyToken()
    const res = await fetch(`${process.env.BASE_URL}/api/v1/auth/verifyToken`,{
 headers:{
      token:token as string
        }
    })
    const data = await res.json()
    return data
}