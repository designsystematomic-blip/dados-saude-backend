# Dados Saúde - Backend

Back-end construído para o front-end Dados Saúde durante o projeto de conclusão da pós-graduação do curso Desenvolvimento Web no IFBA Vitória da Conquista - Bahia, turma 2024.2.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Docker](#docker)
- [Banco de Dados](#banco-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

## Sobre o Projeto

Backend RESTful desenvolvido com Node.js e Express para gerenciar dados de saúde, implementando autenticação JWT e integração com banco de dados PostgreSQL via Prisma ORM.

## 🛠️ Tecnologias

| Tecnologia     | Versão   | Propósito                       |
| -------------- | -------- | ------------------------------- |
| **Node.js**    | v20.19.4 | Runtime JavaScript              |
| **npm**        | 11.6.0   | Gerenciador de pacotes          |
| **Express.js** | -        | Framework web                   |
| **TypeScript** | -        | Tipagem estática                |
| **Prisma**     | -        | ORM para banco de dados         |
| **PostgreSQL** | -        | Banco de dados                  |
| **JWT**        | -        | Autenticação                    |
| **bcryptjs**   | -        | Criptografia de senhas          |
| **Docker**     | -        | Containerização                 |
| **CORS**       | -        | Compartilhamento de recursos    |
| **dotenv**     | -        | Gestão de variáveis de ambiente |
| **python**     | -        | Para configurar o venv          |

## 📦 Pré-requisitos

- **Node.js** v20.19.4 ou superior
- **npm** 11.6.0 ou superior
- **Docker** e **Docker Compose** (para execução containerizada)
- **Git** para versionamento

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/dados-saude-backend.git
cd dados-saude-backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Instalar dependências de desenvolvimento

```bash
npm install -D
```

## ⚙️ Configuração do Ambiente

### Criando arquivo `.env`

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Configure as variáveis conforme seu ambiente (desenvolvimento, teste, produção):

```env
# Banco de Dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5444/dados_saude_db"

# JWT
JWT_SECRET="sua-chave-secreta-super-segura"
JWT_EXPIRATION="24h"

# Server
PORT=8000
NODE_ENV="development"

# AWS S3 (Opcional)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="sua-chave-id"
AWS_SECRET_ACCESS_KEY="sua-chave-secreta"
AWS_S3_BUCKET_NAME="seu-bucket-name"
```

### Diferentes ambientes

- **Desenvolvimento**: `.env` (local)
- **Docker**: `.env.docker` (containerizado)
- **Exemplo**: `.env.example` (template)

## 🐳 Docker

### Executar com Docker Compose

```bash
docker-compose up -d
```

Isso irá:

- Iniciar o container PostgreSQL na porta 5444
- Preparar o banco de dados

Caso resulte em algum erro de permissão na pasta localstack_data, executar:

```bash
chmod 755 localstack_data
```

### Build da imagem Docker

```bash
docker build -t dados-saude-backend:latest .
```

### Parar os containers

```bash
docker-compose down
```

### Visualizar logs

```bash
docker-compose logs -f
```

### Remover volumes (cuidado!)

```bash
docker-compose down -v
```

## 🗄️ Banco de Dados

#### Gerar Prisma Client

```bash
npx prisma generate
```

### Migrations

As migrations gerenciam o versionamento do banco de dados.

#### Executar migrations pendentes

```bash
npx prisma migrate dev --name nome_da_migration
```

#### Ver histórico de migrations

```bash
npx prisma migrate status
```

#### Resetar banco de dados (desenvolvimento apenas)

```bash
npx prisma migrate reset
```

### Studio Prisma (GUI)

Para visualizar e gerenciar dados graficamente:

```bash
npx prisma studio
```

Acesse: `http://localhost:5555`

## 🏃 Executando o Projeto

### Modo desenvolvimento (com reload automático)

```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:8000`

### Modo produção

```bash
npm run build
npm run start
```

### Rodar testes

```bash
npm test
```

## 📁 Estrutura do Projeto

```
src/
├── app.ts                 # Configuração principal do Express
├── config/
│   └── database.ts        # Configuração do Prisma
├── controllers/           # Lógica de requisição/resposta
│   ├── health.controller.ts
│   └── user.controller.ts
├── middlewares/           # Middlewares personalizados
│   └── auth.middleware.ts
├── repository/            # Camada de dados (Data Access)
│   ├── exam/
│   └── user/
├── routes/                # Definição de rotas
│   ├── health.routes.ts
│   └── ...
├── types/                 # Tipos TypeScript
└── utils/                 # Funções utilitárias
prisma/
├── schema.prisma          # Modelo de dados
└── migrations/            # Histórico de mudanças do BD
```

## 📐 Padrões de Código

### Padrão MVC + Repository

Este projeto segue a arquitetura **MVC (Model-View-Controller)** com padrão **Repository** para acesso a dados:

- **Models**: Definidos em `prisma/schema.prisma`
- **Controllers**: Lógica de negócio em `src/controllers/`
- **Routes**: Endpoints em `src/routes/`
- **Repository**: Acesso a dados em `src/repository/`
- **Middlewares**: Autenticação e validação em `src/middlewares/`

### Convenções de Nomenclatura

| Elemento   | Padrão                     | Exemplo                |
| ---------- | -------------------------- | ---------------------- |
| Arquivos   | camelCase                  | `user.controller.ts`   |
| Funções    | camelCase                  | `getUserById()`        |
| Classes    | PascalCase                 | `UserController`       |
| Constantes | UPPER_SNAKE_CASE           | `JWT_EXPIRATION`       |
| Interfaces | PascalCase com prefixo `I` | `IUser`                |
| Tipos      | PascalCase                 | `User`, `UserResponse` |

### Padrão de Resposta da API

```typescript
{
  "success": boolean,
  "statusCode": number,
  "data": object | null,
  "message": string,
  "timestamp": string
}
```

## 🔐 Autenticação

O projeto utiliza **JWT (JSON Web Token)** para autenticação.

### Fluxo de Autenticação

1. Usuário faz login com email e senha
2. Backend valida credenciais
3. Backend gera JWT com informações do usuário
4. Cliente armazena JWT (cookie/localStorage)
5. Cliente envia JWT em requisições subsequentes no header `Authorization`

### Header obrigatório

```
Authorization: Bearer seu_token_jwt_aqui
```

## 📡 API Endpoints

### Saúde da Aplicação

```http
GET /health
```

Resposta:

```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Registrar Usuário

```http
POST /users/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123",
  "name": "João Silva"
}
```

Resposta (201):

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "João Silva"
  },
  "message": "Usuário criado com sucesso"
}
```

### Login

```http
POST /users/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

Resposta (200):

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "usuario@example.com",
      "name": "João Silva"
    }
  },
  "message": "Login realizado com sucesso"
}
```

## ☁️ AWS S3

### Desenvolvimento Local com LocalStack

Para desenvolvimento local, usamos **LocalStack** para emular os serviços AWS, incluindo S3.

#### Pré-requisitos

- **Docker** e **Docker Compose** rodando
- **AWS CLI** instalado localmente
- **awslocal** (wrapper da AWS CLI para LocalStack)

#### Instalação do awslocal

**Windows (PowerShell Admin)**:

```powershell
choco install awslocal
```

**macOS/Linux**:

```bash
pip install awslocal
```

Ou via npm:

```bash
npm install -g awslocal
```

#### Iniciar LocalStack

```bash
docker-compose up -d
```

O LocalStack será iniciado na porta `4566`.

#### Configurar credenciais locais

Crie ou edite `~/.aws/credentials`:

```ini
[default]
aws_access_key_id = test
aws_secret_access_key = test
```

Crie ou edite `~/.aws/config`:

```ini
[default]
region = us-east-1
output = json
```

#### Criar bucket S3 no LocalStack

```bash
awslocal s3 mb s3://dados-saude-bucket
```

Verificar buckets criados:

```bash
awslocal s3 ls
```

#### Variáveis de ambiente para desenvolvimento

Adicione no `.env`:

```env
# AWS LocalStack (Desenvolvimento)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_S3_BUCKET_NAME=dados-saude-bucket
AWS_S3_ENDPOINT=http://localhost:4566
```

#### Testar upload para S3 local

```bash
# Criar arquivo teste
echo "Teste de arquivo" > test.txt

# Upload para S3 local
awslocal s3 cp test.txt s3://dados-saude-bucket/

# Listar arquivos no bucket
awslocal s3 ls s3://dados-saude-bucket/

# Download do arquivo
awslocal s3 cp s3://dados-saude-bucket/test.txt ./downloaded.txt
```

#### Usando AWS SDK com LocalStack

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_S3_ENDPOINT, // http://localhost:4566
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Exemplo: Upload de arquivo
const params = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: "exames/exame-123.pdf",
  Body: fileContent,
  ContentType: "application/pdf",
};

await s3Client.send(new PutObjectCommand(params));
```

### Produção com AWS S3 Real

Para produção, altere as variáveis de ambiente:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua-chave-real
AWS_SECRET_ACCESS_KEY=sua-chave-secreta-real
AWS_S3_BUCKET_NAME=seu-bucket-real
# Remova AWS_S3_ENDPOINT ou deixe em branco
```

### Comandos úteis LocalStack

| Comando                                    | Descrição              |
| ------------------------------------------ | ---------------------- |
| `awslocal s3 mb s3://bucket-name`          | Criar bucket           |
| `awslocal s3 ls`                           | Listar buckets         |
| `awslocal s3 cp arquivo.txt s3://bucket/`  | Upload                 |
| `awslocal s3 cp s3://bucket/arquivo.txt .` | Download               |
| `awslocal s3 rm s3://bucket/arquivo.txt`   | Deletar arquivo        |
| `awslocal s3 rb s3://bucket-name`          | Deletar bucket (vazio) |

Para mais informações: [Documentação LocalStack](https://docs.docker.com/guides/localstack/)

## 🔍 Variáveis de Ambiente

| Variável                | Descrição                       | Exemplo                                    |
| ----------------------- | ------------------------------- | ------------------------------------------ |
| `DATABASE_URL`          | URL de conexão PostgreSQL       | `postgresql://user:pass@localhost:5444/db` |
| `JWT_SECRET`            | Chave secreta para assinar JWTs | `sua-chave-secreta`                        |
| `JWT_EXPIRATION`        | Tempo de expiração do JWT       | `24h`                                      |
| `PORT`                  | Porta do servidor               | `8000`                                     |
| `NODE_ENV`              | Ambiente de execução            | `development`, `production`                |
| `AWS_REGION`            | Região AWS                      | `us-east-1`                                |
| `AWS_ACCESS_KEY_ID`     | ID da chave AWS                 | `AKIA...`                                  |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta AWS               | `...`                                      |
| `AWS_S3_BUCKET_NAME`    | Nome do bucket S3               | `meu-bucket`                               |

## 🐛 Troubleshooting

### Erro: "connect ECONNREFUSED 127.0.0.1:5444"

Certifique-se de que o Docker está rodando:

```bash
docker-compose up -d
```

### Erro: "PrismaClientInitializationError"

Regenere o Prisma Client:

```bash
npx prisma generate
```

### Migrations pendentes

Execute:

```bash
npx prisma migrate dev
```

## 📝 Licença

Este projeto é parte do projeto de conclusão de pós-graduação do IFBA.

## 👥 Contribuidores

- Amanda Prates

---

**Última atualização**: janeiro de 2025
