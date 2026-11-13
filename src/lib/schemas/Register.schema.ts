
import * as z from "zod"

 export const registerSchema =z.object({
    name:z.string().nonempty('Name is Requierd').min(3,'at least 3 char').max(20,'max 20 char'),
    email:z.string().nonempty('email is Requierd').regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,'Invalid Email Adress'),
    password:z.string().nonempty('Password is Requierd').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,'Invalid Password'),
    rePassword:z.string().nonempty('Password is Requierd'),
    phone:z.string().nonempty('Phone is Requierd').regex(/^(\+20|0020|0)?1[0125]\d{8}$/,'Enter Valid Phone')

}).refine((data)=>{
    return data.password === data.rePassword
},{
    error:'Password not match',
    path:['rePassword']
}
)
 export type RegisterType = z.infer<typeof registerSchema>;