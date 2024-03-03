import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DISCORD_WEBHOOK: z.string().url(),
    AUTHORIZATION: z.string(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnv: process.env,
  skipValidation: process.env.NODE_ENV === "development",
});
