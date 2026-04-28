# Auto-Sync: Sincronização Automática com GitHub

Existem 3 formas de usar auto-sync para sincronizar automaticamente suas mudanças com GitHub:

## 1. **Usando npm (Recomendado)**

```bash
# Commit + Push com mensagem padrão (timestamp)
npm run sync

# Commit + Push com mensagem customizada
npm run sync:msg -- "sua mensagem aqui"
# ou
npm run sync:msg "sua mensagem aqui"
```

## 2. **Usando PowerShell Script**

```powershell
# Com mensagem padrão
.\auto-sync.ps1

# Com mensagem customizada
.\auto-sync.ps1 "sua mensagem aqui"
```

## 3. **Usando node diretamente**

```bash
# Com mensagem padrão
node scripts/auto-sync.js

# Com mensagem customizada
node scripts/auto-sync.js "sua mensagem aqui"
```

## Automação (Opcional)

Para sincronizar **automaticamente a cada mudança**, você pode usar:

### Opção A: Watcher com Nodemon (Windows/Linux/Mac)

```bash
npm install -D nodemon
```

Adicionar ao `package.json`:
```json
"scripts": {
  "watch:sync": "nodemon --watch app --watch lib --watch components --watch prisma --ext ts,tsx,js,json --exec 'npm run sync'"
}
```

Depois rodar:
```bash
npm run watch:sync
```

### Opção B: Git Hooks (automático em cada commit)

O projeto já tem um hook `post-commit` configurado que pode fazer push automático. Para ativar:

1. Editar `.git/hooks/post-commit`
2. Adicionar: `git push origin main`

### Opção C: Usando o VS Code (Manual)

Abrir a paleta de comandos (`Ctrl+Shift+P`) e executar:
```
Terminal: Run Task → sync
```

## Dicas

- ✅ Sempre faça `git config user.name` e `git config user.email` antes de usar
- ✅ Configure SSH ou token de acesso para evitar pedir senha
- ✅ Use `npm run sync` após salvar arquivos importantes
- ✅ Para automação em CI/CD, configure Actions no GitHub

---

**Qual forma você prefere usar?**
