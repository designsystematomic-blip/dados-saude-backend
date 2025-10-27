# Introdução

Será utilizado o localstack para configurar o S3 Bucket da AWS localmente, esse serviço permite o armazenamento de imagens em um storage e disponibiliza as URLs da imagem, o que é mais recomendado para lidar do que realizar a subida dos arquivos diretamente no banco de dados Postgres.  Documentação referencia para o processo de subida de arquivos: https://github.com/dockersamples/todo-list-localstack-docker 

# Pacotes necessários

- multer
- multer-s3
- @aws-sdk/client-s3

			npm install multer multer-s3 @aws-sdk/client-s3

Tipos

- @types/multer
- @types/multer-s3

			npm i --save-dev @types/multer
			npm i --save-dev @types/multer-s3


# Recursos necessários 

1. Criando um ambiente virtual:

			python3 -m venv .venv

2. Ativar o ambiente virtual:

			source .venv/bin/activate

- aws cli. Para instalar:

			pip3 install awscli-local

3. Verificando a instalação

			awslocal --version

4. Sempre que for trabalhar com o projeto, é necessário ativar o ambiente virtual primeiro usando:

			source .venv/bin/activate


5. Configurar a awslocal

awslocal configure


Criar buckets S3:

			awslocal s3 mb s3://nome-do-seu-bucket
			awslocal s3 mb s3://dados-saude-bucket-exames
			awslocal s3 mb s3://dados-saude-bucket-vacinas

Listas os buckets

			awslocal s3 ls

Fazer o upload de arquivos

			awslocal s3 cp arquivo.txt s3://nome-do-seu-bucket/

Verificar o conteúdo de um bucket

			awslocal s3 ls s3://nome-do-seu-bucket


Para subir o docker com a localstack

			docker compose -f docker-compose.yaml up -d --build

Para dar permissão para criar o volume da localstack

			mkdir -p localstack && chmod 755 localstack

para listar os buckets:

			awslocal s3 ls