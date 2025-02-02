import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { SendVerificationCode } from "./email/sendVerificationToken";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await SendVerificationCode({
        email: user.email,
        purpose: "Verify your email",
        username: user.name,
        url: url,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await SendVerificationCode({
        email: user.email,
        purpose: "Verify your email",
        username: user.name,
        url: url,
      });
    },
  },
});
