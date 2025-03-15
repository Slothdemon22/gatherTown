import z from "zod";

export const userSchemaSignUp = z.object({
   name: z.string(),
   email: z.string().email(),
   password: z.string().min(8),
});
export const userSchemaSignIn = z.object({
   email: z.string().email(),
   password: z.string().min(8),
});
