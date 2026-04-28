# Script de Auto-Sync para GitHub
# Uso: ./auto-sync.ps1 "mensagem do commit"
# Se não passar mensagem, usa timestamp

param(
    [string]$message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "🔄 Auto-sync iniciado..." -ForegroundColor Cyan

# Adicionar todas as mudanças
git add -A
Write-Host "✅ Arquivos adicionados" -ForegroundColor Green

# Fazer commit
git commit -m $message
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Nenhuma mudança para committar" -ForegroundColor Yellow
    exit 0
}
Write-Host "✅ Commit realizado: $message" -ForegroundColor Green

# Push para origem
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro no push - verifique credenciais" -ForegroundColor Red
}
