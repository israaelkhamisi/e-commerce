import * as z from "zod"

 export const resetPasswordSchema =z.object({
  
   
    newPassword:z.string().nonempty('Password is Requierd').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,'Invalid Password'),
  rePassword:z.string().nonempty('Password is Requierd'),
   }).refine((data) => data.newPassword === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})


export  type resetPasswordtype =z.infer<typeof resetPasswordSchema>