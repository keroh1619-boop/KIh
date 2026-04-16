// Entry point for Pterodactyl
  const { spawn } = require('child_process');

  console.log('🚀 جاري تشغيل البوت...');

  const child = spawn('npx', ['tsx', 'src/index.ts'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
  });

  child.on('error', (err) => {
    console.error('❌ خطأ:', err.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
  