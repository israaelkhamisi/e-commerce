import * as z from "zod";

export const checkoutSchema = z.object({
  city: z.string().nonempty("City is required"),
  details: z.string().nonempty("Address is required"),
  phone: z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
});

export type checkouttype = z.infer<typeof checkoutSchema>;