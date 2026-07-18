import "dotenv/config";
import { ApiError } from "../utils/api-error.js";

export function getEnv(token: string): string {
  const value = process.env[token];

  if (!value) throw ApiError.unauthorize(`missing envionment token ${value}`);

  return value;
}

export const env = {
  PORT: getEnv("PORT"),
  ENVIORNMENT: getEnv("ENVIORNMENT"),

  DATABASE_URL: getEnv("DATABASE_URL"),

  ACCESS_TOKEN: getEnv("ACCESS_TOKEN"),
  ACCESS_TOKEN_EXPIRES_IN: getEnv("ACCESS_TOKEN_EXPIRES_IN"),
  REFRESH_TOKEN: getEnv("REFRESH_TOKEN"),
  REFRESH_TOKEN_EXPIRES_IN: getEnv("REFRESH_TOKEN_EXPIRES_IN"),

  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
};
