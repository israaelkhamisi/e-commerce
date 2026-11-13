import * as z from "zod"

 export const updatemeSchema =z.object({
    name:z.string().nonempty('Name is Requierd').min(3,'at least 3 char').max(20,'max 20 char'),
    email:z.string().nonempty('email is Requierd').regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,'Invalid Email Adress'),
  
    phone:z.string().nonempty('Phone is Requierd').regex(/^(\+20|0020|0)?1[0125]\d{8}$/,'Enter Valid Phone')

})

 export type updatemetype = z.infer<typeof updatemeSchema>;