import z from 'zod';
export const userSignUpSchema = z.object(
    {
        name: z.string(),
        email: z.string().email(),
        password:z.string().min(8)
    }
)

export const userSignInSchema = z.object(
    {
        email: z.string().email(),
        password: z.string().min(8),
    }
)
