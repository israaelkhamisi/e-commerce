'use server'






export  async function verifyResetCode(resetCode: string){
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
    method:'post',
    body:JSON.stringify({ resetCode}),
    headers:{
        'content-type':'application/json'
    }
})
const respdata= await res.json()
return respdata
}