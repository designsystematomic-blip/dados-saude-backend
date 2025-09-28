Pacotes utilizados

npm init -y
npm install express cors jsonwebtoken dotenv @prisma/client bcryptjs
npm install -D typescript ts-node-dev prisma @types/node @types/express @types/cors @types/jsonwebtoken

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
