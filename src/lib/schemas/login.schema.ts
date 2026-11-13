import * as z from "zod"

 export const loginSchema =z.object({
  
    email:z.string().nonempty('email is Requierd').regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,'Invalid Email Adress'),
    password:z.string().nonempty('Password is Requierd').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,'Invalid Password'),
   
}

)
export type LoginType = z.infer<typeof loginSchema>;