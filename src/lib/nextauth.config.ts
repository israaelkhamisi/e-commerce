import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"



 export const nextAuthConfig:NextAuthOptions ={
    providers:[
        Credentials({
            name:'test',
            credentials:{
                email:{placeholder:"Enter your email"},
                password:{placeholder:"Enter your password",
                    type:"password"
                }
            },
 async authorize(data) {
    const senddata={
        email:data?.email,
        password:data?.password
    }
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{
    method:'post',
    body:JSON.stringify(senddata),
    headers:{
        'content-type':'application/json'
    }
})
const respdata= await res.json()
                console.log(respdata)
                if(respdata.message === 'success'){
return{
  
  token: respdata.token,
   name:respdata.user.name,
   email:respdata.user.email
} 
                }
                     return null
            }
           
        })
    ],
    pages:{
        signIn:'/login'
    },
    secret:process.env.BETTER_AUTH_SECRET,
    callbacks:{
        jwt(params) {
            if(params.user){
                 params.token.tokenjwt = params.user.token    
            }
             return params.token
        },
        session(params){
 return params.session
        }
       
    },

}