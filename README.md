# Portfólio Renan Gomes

Sistema editorial de portfólio construído em Next.js, TypeScript, Tailwind, Prisma e SQLite local.

## Estado atual

- A base legacy continua no repositório como referência de conteúdo.
- O novo app Next.js já está estruturado com rotas públicas, admin e API.
- O schema Prisma inicial já está modelado para a próxima fase.
- O banco local SQLite é inicializado por script em vez de `prisma migrate dev`.

## Rodar localmente

```bash
npm install
npm run dev
```

Para inicializar o SQLite local:

```bash
npm run db:migrate
npm run db:seed
```

## Próximo passo

Conectar o schema Prisma ao PostgreSQL, fechar autenticação e migrar o CRUD editorial.
