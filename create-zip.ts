// تم التطوير بواسطة كيرو

import archiver from "archiver";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";

const rootDir = resolve(__dirname, "..");
const outputDir = resolve(rootDir, "..");
const outputPath = join(outputDir, "discord-ticket-bot-v5.zip");

const output = createWriteStream(outputPath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  const sizeKB = (archive.pointer() / 1024).toFixed(1);
  console.log(`✅ تم إنشاء الملف المضغوط: ${outputPath}`);
  console.log(`📦 الحجم: ${sizeKB} KB`);
});

archive.on("error", (err) => {
  console.error("❌ خطأ في إنشاء الملف المضغوط:", err);
  process.exit(1);
});

archive.pipe(output);

archive.directory(join(rootDir, "src"), "discord-bot/src");
archive.directory(join(rootDir, "drizzle"), "discord-bot/drizzle");
archive.directory(join(rootDir, "scripts"), "discord-bot/scripts");

const rootFiles = [
  "package.json",
  "tsconfig.json",
  "drizzle.config.ts",
  ".env.example",
];

for (const file of rootFiles) {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    archive.file(filePath, { name: `discord-bot/${file}` });
  }
}

archive.finalize();
