import * as z from "zod"

 export const changePasswordSchema =z.object({
   currentPassword:z.string().nonempty(),
  password:z.string().nonempty('Password is Requierd').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,'Invalid Password'),
    rePassword:z.string().nonempty('Password is Requierd'),
}).refine((data)=>{
    return data.password === data.rePassword
},{
    error:'Password not match',
    path:['rePassword']
})

 export type changePasswordtype = z.infer<typeof changePasswordSchema>;