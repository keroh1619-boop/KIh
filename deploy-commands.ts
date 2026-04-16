// تم التطوير بواسطة كيرو

import { REST, Routes } from "discord.js";
import { config } from "./config";

import * as panelCommand from "./commands/panel";
import * as techpanelCommand from "./commands/techpanel";
import * as dashboardCommand from "./commands/dashboard";
import * as comeCommand from "./commands/come";
import * as resetCommand from "./commands/reset";
import * as doneCommand from "./commands/done";
import * as permissionCommand from "./commands/permission_cmd";
import * as settingsCommand from "./commands/settings";
import * as helpCommand from "./commands/help";
import * as bulkcloseCommand from "./commands/bulkclose";

const commands = [
  panelCommand.data.toJSON(),
  techpanelCommand.data.toJSON(),
  dashboardCommand.data.toJSON(),
  comeCommand.data.toJSON(),
  resetCommand.data.toJSON(),
  doneCommand.data.toJSON(),
  permissionCommand.data.toJSON(),
  settingsCommand.data.toJSON(),
  helpCommand.data.toJSON(),
  bulkcloseCommand.data.toJSON(),
];

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
  try {
    console.log(`🔄 جاري تسجيل ${commands.length} أوامر...`);
    const data = await rest.put(Routes.applicationCommands(config.clientId), { body: commands }) as unknown[];
    console.log(`✅ تم تسجيل ${data.length} أوامر بنجاح!`);
    commands.forEach((cmd) => console.log(`   /${(cmd as any).name}`));
  } catch (error) {
    console.error("❌ خطأ في تسجيل الأوامر:", error);
    process.exit(1);
  }
})();
