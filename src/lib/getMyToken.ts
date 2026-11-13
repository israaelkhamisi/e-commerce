import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'


export async function getMyToken() {
const cookiedata = await cookies()
const sessionToken = cookiedata.get('next-auth.session-token')
const token = await decode({token: sessionToken?.value, secret: process.env.BETTER_AUTH_SECRET!})


  return token?.tokenjwt
   
  
}
