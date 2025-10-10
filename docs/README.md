## Sobre o projeto

Back-end construído para o front-end Dados Saúde durante o projeto de conclusão da pós-graduação do curso Desenvolvimento Web no IFBA Vitória da Conquista - Bahia, turma 2024.2.

## Tecnologias utilizadas

- 'node.js' para criar o serviço
  - versão necessária do node.js v20.19.4
- 'npm' para gerenciar os pacotes utilizados
  - versão necessária do npm 11.6.0
- 'nodemon' para permitir que o HMR funcione e o projeto ser buildado automaticamente a cada nova alteração
- 'express.js' para criação das rotas
- 'cors' para permitir o consumo das APIs do projeto
- 'dotenv' para gestão das variáveis de ambientes criadas no arquivo .env
- 'typescript' para criação da tipagem
- 'jsonwebtoken' para geração do token JWT do usuário logado, essa informação será usada pelo front-end para guardar a sessão do usuário logado nos cookies ou session do navegador
- '@prism/client' ORM (Mapeamento Objeto-Relacional) é utilizado para facilitar a gestão do SQL, que será feito via typescript, do banco de dados.
  - No arquivo ./prisma/schema.prisma são criadas os models (Tabelas) existentes no banco de dados
- 'bcryptjs' encriptador de dados

- Docker + Docker postgres image

## Para instalação dos pacotes citados no tópico passado

### Necessário ter o nodejs e o npm instalados

npm install express cors jsonwebtoken dotenv @prisma/client bcryptjs
npm install -D typescript ts-node-dev prisma @types/node @types/express @types/cors @types/jsonwebtoken

## Como se preparar par iniciar o projeto?

1.  Na raiz da pasta do projeto é necessário instalar as dependências com o comando a seguir:

    npm install

2.  Para rodar os tipos e crir o banco de dados:
    2.1 Criar na pasta raiz o arquivo .env, baseando-se no arquivo .env-example. Esse .env será usado para configurar o banco no docker Conteúdo do arquivo:

        DATABASE_URL="postgresql://postgres:postgres@localhost:5444/dados_saude_db"

3.  Uma vez que as dependências foram instaladas com sucesso, basta rodar o comando a seguir:

    npm run dev

Para se registar

POST
http://localhost:8000/users/register

{
"email": "amandaprates1997@gmail.com",
"password": "123",
"name": "Amanda"
}

Para login
POST
http://localhost:8000/users/

{
"email": "amandaprates1997@gmail.com",
"password": "123"
}
