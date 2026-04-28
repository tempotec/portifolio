# Portfólio Renan Gomes

Aplicação editorial do portfólio construída com Next.js, TypeScript, Tailwind, Prisma e SQLite local.

## Estrutura essencial

- `app/`: páginas públicas, painel admin e rotas de API.
- `components/`: módulos de interface do site e do admin.
- `lib/`: acesso a dados, autenticação, sessão e conteúdo base.
- `prisma/`: schema, migrations e seed.
- `scripts/`: bootstrap local do SQLite.

## Rodar localmente

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

## Ambiente local

- O app usa `dev.db` como banco SQLite local.
- As credenciais e o `DATABASE_URL` podem ser definidos em `.env`.
- Arquivos de build, logs e testes locais devem permanecer fora do versionamento.
