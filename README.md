# Dados Saúde - Backend

Back-end construído para o front-end Dados Saúde durante o projeto de conclusão da pós-graduação do curso Desenvolvimento Web no IFBA Vitória da Conquista - Bahia, turma 2024.2.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura do banco de dados](arquitetura)
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

## Arquitetura

![alt text](prisma-uml.png)

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

## Links para instalação dos pacotes pré-requisito

- **Node.js** e **npm** v20.19.4 ou superior

  - Windows - [NodeJS Download](https://nodejs.org/en/download)
  - Mac - `brew install node@24`
  - Linux/ubuntu - `brew install node@24`

- **Docker** e **Docker Compose** (para execução containerizada)

  - Windows - [utilizar Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)
  - Mac - [Docker Engine](https://formulae.brew.sh/formula/docker)
  - Linux/ubuntu - [Docker Engine](https://docs.docker.com/engine/install/ubuntu/)

- **Git** para versionamento

  - Windows - https://git-scm.com/install/windows
  - Mac - https://git-scm.com/install/mac
  - Linux/ubuntu - https://git-scm.com/install/linux

- **python**
  - Windows - https://www.python.org/downloads/windows/
  - Mac - https://www.python.org/downloads/macos/
  - Linux/ubuntu - https://www.python.org/downloads/source/

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/designsystematomic-blip/dados-saude-backend
cd ./dados-saude-backend
```

### 2. Instalar dependências

```bash
npm install
```

## ⚙️ Configuração do Ambiente

### Criando arquivo `.env`

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 2. 🐳 Inicializando o Docker

- Inicialize o docker
- Na raiz do projeto, rodar o comando `docker compose up -d `

### 3. Configurando a AWS CLI

Será utilizado o localstack para configurar o S3 Bucket da AWS localmente, esse serviço permite o armazenamento de imagens em um storage e disponibiliza as URLs da imagem, o que é mais recomendado para lidar do que realizar a subida dos arquivos diretamente no banco de dados Postgres. Documentação referencia para o processo de subida de arquivos: https://github.com/dockersamples/todo-list-localstack-docker

#### 3.1 Criando um ambiente virtual (Mac ou Linux):

    python3 -m venv .venv

#### 3.1.2. Ativar o ambiente virtual:

    	source .venv/bin/activate

#### 3.1.3 Instalando a aws cli Para instalar:

    	pip3 install awscli-local

#### 3.1.4 Verificando a instalação

    	awslocal --version

Sempre que for trabalhar com o projeto, é necessário ativar o ambiente virtual primeiro usando:

      source .venv/bin/activate

#### 3.1.5. Configurar a awslocal

    awslocal configure

Configurar os valores solicitados como:

- AWS Access Key ID: test
- AWS Secret Access Key: test
- Default region name: us-east-1

#### 3.2 Criando um ambiente virtual (Windows):

    python -m venv .venv

#### 3.1.2. Ativar o ambiente virtual:

    .venv\Scripts\activate

#### 3.1.3 Instalando a aws cli Para instalar:

    pip install awscli

#### 3.1.4 Verificando a instalação

    	aws --version

Sempre que for trabalhar com o projeto, é necessário ativar o ambiente virtual primeiro usando:

    	.venv\Scripts\activate

#### 3.1.5. Configurar a awslocal

      aws configure

Configurar os valores solicitados como:

- AWS Access Key ID: test
- AWS Secret Access Key: test
- Default region name: us-east-1

#### 4. Criando o S3 bucket

Uma vez que a CLI da AWS está instalada e configurada, assim como o docker inicializado, para criar o bucket basta seguir:

##### 4.1 Criando o S3 bucket para Linux ou Mac

    		awslocal s3 mb s3://dados-saude-bucket-exames

##### 4.2 Criando o S3 bucket para Windows

    		aws s3 mb s3://dados-saude-bucket-exames --endpoint-url=http://localhost:4566

##### 4.3 Verificar se o bucket foi criado para Linux ou Mac

    		awslocal s3 ls

##### 4.4 Verificar se o bucket foi criado para Windows

    		aws s3 ls

Caso tenha erro de permissão ao rodar o docker. Para dar permissão para criar o volume da localstack

    		mkdir -p localstack && chmod 755 localstack

5. Configure as variáveis conforme seu ambiente (desenvolvimento, teste, produção):

5.1 Gere uma chave de segurança criptografada para a variável JWT_SECRET

Você pode gerar uma chave secreta forte usando o comando abaixo:

```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Arquivo .env

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

### 6. 🗄️ Inicializando o banco de dados

#### 6.1 Gerar Prisma Client

```bash
npx prisma generate
```

#### 6.2 Migrations

As migrations gerenciam o versionamento do banco de dados.

#### 6.3 Executar migrations pendentes

```bash
npx prisma migrate dev
```

#### 6.4 Verificar os dados do banco via interface

```bash
npx prisma studio
```

## 7. 🏃 Executando o Projeto

### Modo desenvolvimento (com reload automático)

```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:8000`

## Outras informações sobre Docker e o banco de dados

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

## 👥 Dúvidas?

amandaprates1997@gmail.com
