import * as z from "zod"

 export const forgotPasswordSchema =z.object({
  
    email:z.string().nonempty('email is Requierd').regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,'Invalid Email Adress'),
   
   
})

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;