import z from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000').optional(),
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  NEXT_PUBLIC_APP_URL: z.string(),
  UPLOADTHING_SECRET: z.string(),
  AUTH_TRUST_HOST: z.string().default('localhost'),
  NEXTAUTH_URL: z.string(),
  STRIPE_SECRET: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  RESEND_KEY: z.string(),
  NEXT_PUBLIC_GITHUB_TOKEN: z.string(),
  REVALIDATION_LOG_WEBHOOK_URL: z.string(),
  NEXT_PUBLIC_RAZORPAY_API_ID: z.string(),
  RAZORPAY_API_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
