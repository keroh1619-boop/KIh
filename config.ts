// تم التطوير بواسطة كيرو

import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN!,
  clientId: process.env.DISCORD_CLIENT_ID!,
  ownerId: process.env.OWNER_ID!,
  databaseUrl: process.env.BOT_DATABASE_URL || process.env.DATABASE_URL!,
  openaiApiKey: process.env.OPENAI_API_KEY || process.env.REPLIT_OPENAI_API_KEY || "",
  openaiBaseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  ticket: {
    cooldownSeconds: 30,
    maxOpenTickets: 1,
    pointsPerClose: 10,
    priorities: ["عالي 🔴", "متوسط 🟡", "منخفض 🟢"] as string[],
  },
} as const;

const requiredVars = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID", "OWNER_ID"];
for (const key of requiredVars) {
  if (!process.env[key]) {
    console.error(`❌ المتغير البيئي ${key} مفقود!`);
    process.exit(1);
  }
}

if (!config.databaseUrl) {
  console.error("❌ BOT_DATABASE_URL مفقود!");
  process.exit(1);
}
