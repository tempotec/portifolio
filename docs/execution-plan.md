# Plano de Execução

## Fase 0 - Trava de arquitetura

- Objetivo: fechar stack, auth, sessão, rotas, storage e entidades.
- Entregável: decisão técnica congelada e escopo do MVP.
- Dependência: nenhuma.
- Motivo: evita retrabalho estrutural.

## Fase 1 - Bootstrap do Next.js

- Objetivo: criar a nova base única do sistema.
- Entregável: app Next.js com TypeScript, Tailwind, App Router e layout base.
- Dependência: Fase 0.
- Motivo: sem a base, o resto é improviso.

## Fase 1.5 - Migração do legado

- Objetivo: transformar o site atual em seed e referência.
- Entregável: inventário de conteúdo, mapeamento de assets e descarte do que não entra.
- Dependência: Fase 1.
- Motivo: o novo modelo precisa nascer do conteúdo real.

## Fase 2 - Prisma, PostgreSQL e autenticação

- Objetivo: consolidar persistência e acesso.
- Entregável: schema Prisma, conexão com PostgreSQL, usuários, sessões e RBAC.
- Dependência: Fases 0 e 1.
- Motivo: o admin e o conteúdo precisam existir antes do front completo.

## Fase 3 - Admin shell e CRUD editorial

- Objetivo: permitir edição real do conteúdo.
- Entregável: dashboard admin, navegação, CRUD de hero, projetos, serviços, about, skills, contato, mídia e settings.
- Dependência: Fase 2.
- Motivo: este é o centro do produto.

## Fase 4 - Site público

- Objetivo: substituir o legado pelo conteúdo publicado.
- Entregável: home pública, páginas de projetos, sobre e contato, com SEO técnico.
- Dependência: Fase 3.
- Motivo: o site deve consumir o sistema, não ser a origem da verdade.

## Fase 5 - Leads e inbox

- Objetivo: fechar o fluxo de contato.
- Entregável: formulário, persistência de mensagens, inbox admin e triagem.
- Dependência: Fases 2 e 4.
- Motivo: contato só faz sentido quando o sistema já está publicável.

## Fase 6 - Hardening

- Objetivo: estabilizar para produção.
- Entregável: validação, rate limit, monitoramento, logs, backup, testes e deploy.
- Dependência: tudo acima.
- Motivo: estabilização vem depois da funcionalidade.
