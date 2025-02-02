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

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z.object({
  new_password: z
    .string()
    .min(6, { message: "Min length of password must be 6" })
    .max(100),
  confirm_password: z.string(),
});

export type signupType = z.infer<typeof signUpSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
export type NewPasswordType = z.infer<typeof newPasswordSchema>;
