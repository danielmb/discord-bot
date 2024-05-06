import * as dotenv from 'dotenv';
dotenv.config();
const required = (key: string) => {
  throw new Error(`Missing required environment variable ${key}`);
};
export const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || required('DISCORD_TOKEN'),
  DISCORD_CLIENT_ID:
    process.env.DISCORD_CLIENT_ID || required('DISCORD_CLIENT_ID'),
} as const;
