import * as z from "zod"

export const verifyResetCodeSchema =z.object(
{
    resetCode:z.string().regex(/^\d{6}$/, "Code must be 6 digits")
}
)
    
export type verifyResetCodetype =z.infer<typeof  verifyResetCodeSchema >