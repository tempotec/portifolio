// scripts/auto-sync.js
// Auto-commit e push automático de mudanças
// Uso: node scripts/auto-sync.js "mensagem opcional"

const { execSync } = require("child_process");
const path = require("path");

const message =
  process.argv[2] || `Update: ${new Date().toISOString().slice(0, 19)}`;

try {
  console.log("🔄 Auto-sync iniciado...");

  // Stage all changes
  execSync("git add -A", { stdio: "inherit" });
  console.log("✅ Arquivos adicionados");

  // Commit
  try {
    execSync(`git commit -m "${message}"`, { stdio: "inherit" });
    console.log(`✅ Commit realizado: ${message}`);
  } catch (e) {
    if (e.status !== 1) throw e;
    console.log("⚠️ Nenhuma mudança para committar");
    process.exit(0);
  }

  // Push
  execSync("git push origin main", { stdio: "inherit" });
  console.log("✅ Push realizado com sucesso!");
} catch (error) {
  console.error("❌ Erro:", error.message);
  process.exit(1);
}
