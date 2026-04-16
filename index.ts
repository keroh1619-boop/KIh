// تم التطوير بواسطة كيرو

import { Client, GatewayIntentBits, Partials } from "discord.js";
import { config } from "./config";
import { handleReady } from "./events/ready";
import { handleInteractionCreate } from "./events/interactionCreate";
import { handleMessageCreate } from "./events/messageCreate";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

client.once("clientReady", () => handleReady(client));

client.on("interactionCreate", (interaction) =>
  handleInteractionCreate(interaction)
);

client.on("messageCreate", (message) => handleMessageCreate(message));

process.on("unhandledRejection", (error) => {
  console.error("❌ خطأ غير معالج:", error);
});

process.on("uncaughtException", (error) => {
  console.error("❌ استثناء غير معالج:", error);
});

client
  .login(config.token)
  .then(() => {
    console.log("🔗 جاري الاتصال بـ Discord...");
  })
  .catch((error) => {
    console.error("❌ فشل الاتصال بـ Discord:", error);
    process.exit(1);
  });
