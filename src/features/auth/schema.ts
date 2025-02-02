import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, { message: "Min length of username must be 3" })
    .max(20, { message: "Max length of username must be 20" }),
  password: z
    .string()
    .min(6, { message: "Min length of password must be 6" })
    .max(100),
});

export type signupType = z.infer<typeof signUpSchema>;
