# Guia de Importação de Currículo

## Como usar o sistema de importação

O sistema de importação permite que você carregue automaticamente seus dados de currículo a partir de um arquivo JSON ou CSV. Todos os campos serão preenchidos automaticamente nos respectivos campos do formulário.

### Passos para importar:

1. **Clique em "Baixar Template"** - Você receberá um arquivo JSON de exemplo com a estrutura correta.

2. **Preencha o arquivo** - Edite o arquivo JSON com seus dados pessoais:
   - Informações pessoais (nome, email, telefone, localização)
   - Resumo profissional
   - Experiências (empresa, cargo, descrição, datas)
   - Educação (instituição, curso, grau, data)
   - Certificações (título, emissor, data)
   - Idiomas (nome do idioma, nível de proficiência)
   - Links de redes sociais e portfólio

3. **Selecione o arquivo** - Clique em "Escolher arquivo" e selecione seu arquivo JSON/CSV

4. **(Opcional) Adicione uma foto de perfil** - Você pode carregar uma imagem para sua foto de perfil

5. **Clique em "Importar Currículo"** - O sistema processará o arquivo e preencherá todos os campos automaticamente

## Formato de arquivo

### JSON

O arquivo JSON deve seguir esta estrutura:

```json
{
  "fullName": "Seu Nome",
  "email": "seu@email.com",
  "phone": "+55 11 98765-4321",
  "location": "Cidade, Estado",
  "profileImageAlt": "Foto de perfil",
  "professionalSummary": "Descrição sobre você e sua experiência profissional",
  "nationalId": "123.456.789-00",
  "linkedinUrl": "https://linkedin.com/in/seu-perfil",
  "portfolioUrl": "https://seu-portfolio.com",
  "githubUrl": "https://github.com/seu-usuario",
  "status": "DRAFT",
  "experiences": [
    {
      "company": "Nome da Empresa",
      "position": "Seu Cargo",
      "description": "Descrição do que você fez",
      "startDate": "2020-01",
      "endDate": null,
      "isCurrent": true,
      "skills": ["React", "TypeScript", "Node.js"],
      "imageUrl": "https://logo-da-empresa.com/logo.png",
      "imageAlt": "Logo da empresa"
    }
  ],
  "educations": [
    {
      "institution": "Nome da Universidade",
      "course": "Nome do Curso",
      "degree": "Bacharelado",
      "area": "Tecnologia",
      "startDate": "2014-01",
      "endDate": "2018-12",
      "isCurrent": false,
      "description": "Informações adicionais sobre o curso",
      "imageUrl": "https://logo-universidade.com/logo.png",
      "imageAlt": "Logo da universidade"
    }
  ],
  "certifications": [
    {
      "title": "Nome da Certificação",
      "issuer": "Emissor",
      "credentialUrl": "https://link-da-certificacao.com",
      "issueDate": "2021-05",
      "expiryDate": "2024-05",
      "imageUrl": "https://logo-certificacao.com/logo.png",
      "imageAlt": "Badge da certificação"
    }
  ],
  "languages": [
    {
      "name": "Português",
      "proficiency": "Nativo"
    },
    {
      "name": "Inglês",
      "proficiency": "Fluente"
    }
  ]
}
```

### CSV

Para CSV, a primeira linha deve conter os headers, e as linhas subsequentes os dados.

## Campos de imagens

Você pode incluir URLs de imagens em seus dados de currículo:

- **Foto de perfil**: Use o campo `profileImageUrl` (pode carregar como arquivo também)
- **Imagens de experiências**: Use `imageUrl` em cada experiência (ex: logo da empresa)
- **Imagens de educação**: Use `imageUrl` em cada educação (ex: logo da instituição)  
- **Imagens de certificações**: Use `imageUrl` em cada certificação (ex: badge)

Para cada imagem, opcionalmente inclua `imageAlt` com uma descrição para acessibilidade:

```json
{
  "company": "Acme Corporation",
  "position": "Developer",
  "imageUrl": "https://acme-corp.com/logo.png",
  "imageAlt": "Logo da Acme Corporation"
}
```

### Formatos de imagem suportados

- JPG/JPEG
- PNG
- WebP
- GIF

### URLs vs. Upload

- **URLs externas**: Inclua URLs HTTPS públicas de logos e imagens online
- **Upload direto**: A foto de perfil pode ser carregada como arquivo durante a importação
- **Base64**: Imagens podem ser convertidas para base64 inline no JSON (menos recomendado)

## Formato de datas

As datas devem estar no formato `YYYY-MM` (exemplo: `2020-01` para janeiro de 2020).

Para trabalhos ou estudos em progresso, deixe `endDate` como `null` e defina `isCurrent` como `true`.

## Proficiência de idiomas

Os níveis de proficiência recomendados são:
- `Nativo`
- `Fluente`
- `Avançado`
- `Intermediário`
- `Iniciante`

## Dicas importantes

- **Valide seu JSON**: Certifique-se de que o arquivo JSON é válido. Use um validador online se necessário.
- **Datas obrigatórias**: Campos `startDate` e `issueDate` são obrigatórios
- **Arrays vazios**: Se você não tiver certificações, deixe o array `certifications` vazio: `[]`
- **Nulo vs vazio**: Use `null` para campos opcionais não preenchidos, não strings vazias

## Problemas comuns

**"Arquivo inválido"**
- Verifique se o arquivo é JSON válido ou CSV bem formatado
- Tente fazer download do template novamente e preencha a partir dele

**"Erro ao processar arquivo"**
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme que as datas seguem o formato `YYYY-MM`

**Dados não aparecem após importação**
- Recarregue a página
- Verifique se a importação foi bem-sucedida (deve aparecer uma mensagem verde)

## Próximas etapas

Após importar, você pode:
1. Revisar e ajustar os dados no formulário
2. Adicionar mais entradas (experiências, educações, etc.)
3. Publicar o currículo para aparecer no site público

