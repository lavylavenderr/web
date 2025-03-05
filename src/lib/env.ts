import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  DISCORD_WEBHOOK: z.string().url(),
  AUTHORIZATION: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

type env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
