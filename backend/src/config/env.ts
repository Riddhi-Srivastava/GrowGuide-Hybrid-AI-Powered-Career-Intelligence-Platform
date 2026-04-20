import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 5000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:8082",
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/growguide",
  syncCron: process.env.SYNC_CRON ?? "0 9 * * 1",
  newBadgeDays: Number(process.env.NEW_BADGE_DAYS ?? 14)
};
