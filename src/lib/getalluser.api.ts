'use server'


export async function getAllUser() {
  
    const res = await fetch(`${process.env.BASE_URL}/api/v1/users`)
    const data = await res.json()
    return data
}