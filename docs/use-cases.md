# Casos de Uso - Dados Saúde

## 📋 Índice de Casos de Uso

1. [Registrar Usuário](#1-registrar-usuário)
2. [Login de Usuário](#2-login-de-usuário)
3. [Visualizar Perfil do Usuário](#3-visualizar-perfil-do-usuário)
4. [Gerenciar Exames](#4-gerenciar-exames)

---

## 1. Registrar Usuário

**Objetivo:** Permitir que novos usuários se registrem na plataforma Dados Saúde.

**Atores:**

- Novo Usuário
- Sistema de Autenticação

**Pré-condições:**

- Usuário não possui conta na plataforma
- Aplicação está funcionando corretamente

**Fluxo Principal:**

1. Usuário acessa a página de registro
2. Preenche os dados obrigatórios:
   - Nome completo
   - Email
   - Senha
3. Sistema valida os dados:
   - Email deve ser único e válido
   - Senha deve atender critérios de segurança
4. Sistema criptografa a senha
5. Sistema armazena o novo usuário no banco de dados
6. Sistema exibe mensagem de sucesso
7. Usuário é redirecionado para a página de login

**Fluxo Alternativo:**

- Se email já existe: Sistema exibe erro e solicita outro email
- Se senha é fraca: Sistema exibe requisitos de segurança
- Se dados são inválidos: Sistema exibe validação específica

**Pós-condições:**

- Novo usuário registrado no sistema
- Dados armazenados com segurança
- Usuário pode fazer login

**Endpoint API:**

```http
POST /users/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "SenhaSegura123!",
  "name": "João Silva"
}
```

**Resposta de Sucesso (201):**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "uuid-12345",
    "email": "usuario@example.com",
    "name": "João Silva"
  },
  "message": "Usuário criado com sucesso"
}
```

### Diagrama do Caso de Uso

![Registrar Usuário](./use-cases/1%20-%20register-user.png)

---

## 2. Login de Usuário

**Objetivo:** Autenticar um usuário já registrado e fornecer acesso à plataforma.

**Atores:**

- Usuário Registrado
- Sistema de Autenticação
- Sistema JWT

**Pré-condições:**

- Usuário possui conta registrada
- Aplicação está funcionando corretamente

**Fluxo Principal:**

1. Usuário acessa a página de login
2. Insere credenciais:
   - Email registrado
   - Senha
3. Sistema valida email e senha:
   - Verifica se usuário existe
   - Compara senha com hash armazenado
4. Credenciais válidas: Sistema gera JWT
5. Sistema retorna token JWT ao cliente
6. Cliente armazena token (localStorage/cookie)
7. Usuário é redirecionado ao dashboard

**Fluxo Alternativo:**

- Se email não existe: Sistema exibe "Usuário não encontrado"
- Se senha incorreta: Sistema exibe "Credenciais inválidas"
- Se conta está inativa: Sistema exibe mensagem apropriada

**Pós-condições:**

- Usuário autenticado
- Token JWT armazenado no cliente
- Sessão ativa por 24 horas

**Endpoint API:**

```http
POST /users/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "SenhaSegura123!"
}
```

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid-12345",
      "email": "usuario@example.com",
      "name": "João Silva"
    }
  },
  "message": "Login realizado com sucesso"
}
```

### Diagrama do Caso de Uso

![Login](./use-cases/2%20-%20login.png)

---

## 3. Visualizar Perfil do Usuário

**Objetivo:** Permitir que o usuário visualize e gerencie seus dados pessoais de saúde.

**Atores:**

- Usuário Autenticado
- Sistema de Dados
- Base de Dados

**Pré-condições:**

- Usuário está autenticado (possui token JWT válido)
- Usuário acessou a seção de perfil

**Fluxo Principal:**

1. Sistema verifica autenticação (JWT válido)
2. Sistema recupera dados do usuário:
   - Informações pessoais
   - Dados de saúde:
     - Tipo sanguíneo
     - Alergias
     - Doenças crônicas
     - Medicamentos contínuos
   - Plano de saúde
   - Contatos de emergência
3. Sistema exibe perfil completo na interface
4. Usuário pode editar seus dados
5. Usuário salva alterações

**Fluxo Alternativo:**

- Se token expirou: Sistema solicita novo login
- Se usuário não encontrado: Sistema exibe erro 404
- Se dados incompletos: Sistema destaca campos vazios

**Pós-condições:**

- Dados do usuário exibidos
- Usuário pode editar suas informações
- Histórico de alterações registrado

**Endpoint API:**

```http
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "uuid-12345",
    "name": "João Silva",
    "email": "usuario@example.com",
    "sexo": "M",
    "data_nascimento": "1990-05-15",
    "numero_celular": "(77) 99999-9999",
    "tipo_sanguineo": "O+",
    "plano_saude": "Unimed",
    "tem_alergias": true,
    "lista_alergias": "Penicilina, Frutos do mar",
    "tem_doencas_cronicas": true,
    "lista_doencas_cronicas": "Hipertensão",
    "usa_medicamentos_continuos": true,
    "medicamentos_continuos": "Losartana 50mg diários"
  },
  "message": "Perfil recuperado com sucesso"
}
```

### Diagrama do Caso de Uso

![Perfil do Usuário](./use-cases/3%20-%20user-profile.png)

---

## 4. Gerenciar Exames

**Objetivo:** Permitir que usuários façam upload, armazenem e organizem seus exames médicos na plataforma.

**Atores:**

- Usuário Autenticado
- Sistema de Exames
- AWS S3
- Base de Dados

**Pré-condições:**

- Usuário está autenticado
- Arquivo de exame disponível (PDF, imagem, etc.)
- Espaço de armazenamento disponível no S3

**Fluxo Principal:**

1. Usuário acessa seção de exames
2. Clica em "Novo Exame"
3. Preenche informações:
   - Nome do exame
   - Data do exame
   - Tipo de exame
   - Especialidade
   - Observações
4. Faz upload do arquivo
5. Sistema valida arquivo:
   - Verifica tipo MIME
   - Verifica tamanho
6. Sistema comprime arquivo (se necessário)
7. Sistema faz upload para AWS S3
8. Sistema armazena referência no banco de dados
9. Sistema exibe confirmação de sucesso
10. Exame fica disponível para visualização e compartilhamento

**Fluxo Alternativo:**

- Se arquivo muito grande: Sistema sugere compressão
- Se tipo de arquivo não suportado: Sistema exibe erro
- Se upload falha: Sistema tenta novamente automaticamente
- Usuário pode deletar exame após upload

**Pós-condições:**

- Exame armazenado no S3
- Referência registrada no banco
- Exame acessível ao usuário
- Dados sincronizados

**Endpoint API - Upload:**

```http
POST /exams/upload
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

{
  "nome_exame": "Ressonância Magnética",
  "data_exame": "2025-01-10",
  "tipo_exame": "Imagem",
  "especialidade": "Neurologia",
  "observacoes": "Exame sem contraste",
  "arquivo": <arquivo_binário>
}
```

**Resposta de Sucesso (201):**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id_exame": "exam-uuid-12345",
    "nome_exame": "Ressonância Magnética",
    "data_exame": "2025-01-10",
    "tipo_exame": "Imagem",
    "arquivo_url": "https://s3.amazonaws.com/dados-saude-bucket/exames/exam-uuid-12345.pdf",
    "data_upload": "2025-01-14T10:30:00Z"
  },
  "message": "Exame enviado com sucesso"
}
```

**Endpoint API - Listar Exames:**

```http
GET /exams
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id_exame": "exam-uuid-12345",
      "nome_exame": "Ressonância Magnética",
      "data_exame": "2025-01-10",
      "tipo_exame": "Imagem",
      "especialidade": "Neurologia",
      "arquivo_url": "https://s3.amazonaws.com/...",
      "data_upload": "2025-01-14T10:30:00Z"
    }
  ],
  "message": "Exames recuperados com sucesso"
}
```

### Diagrama do Caso de Uso

![Gerenciar Exames](./use-cases/4%20-%20exam-manage.png)

---

## 📊 Fluxo Completo da Aplicação

```
┌─────────────────────────────────────────────────────────┐
│             PLATAFORMA DADOS SAÚDE                      │
└─────────────────────────────────────────────────────────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
         ┌──────▼─────┐ ┌──▼────────┐ ┌▼──────────┐
         │  Registrar │ │  Login    │ │  Guest    │
         │  Usuário   │ │  Usuário  │ │  (Verm.)  │
         └──────┬─────┘ └──┬────────┘ └───────────┘
                │          │
                └──────┬───┘
                       │
              ┌────────▼─────────┐
              │ Usuário Logado   │
              │ (JWT Válido)     │
              └────────┬─────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   ┌────▼────┐  ┌─────▼────┐  ┌──────▼──────┐
   │ Perfil  │  │ Exames   │  │  Contatos   │
   │ Usuário │  │ Médicos  │  │ Emergência  │
   └─────────┘  └────┬─────┘  └─────────────┘
                     │
          ┌──────────┼──────────┐
          │          │          │
     ┌────▼──┐  ┌───▼───┐  ┌───▼──┐
     │ Upload│  │ Editar│  │Deletar│
     │Exames │  │Exames │  │Exames │
     └───────┘  └───────┘  └───────┘
          │          │          │
          └──────────┼──────────┘
                     │
              ┌──────▼───────┐
              │   AWS S3     │
              │ (Storage)    │
              └──────────────┘
```

---

## 🔐 Considerações de Segurança

| Aspecto             | Implementação                         |
| ------------------- | ------------------------------------- |
| **Autenticação**    | JWT com expiração de 24h              |
| **Criptografia**    | bcryptjs para senhas                  |
| **Dados Sensíveis** | Sem logs em produção                  |
| **S3 Access**       | Apenas usuário autenticado            |
| **Validação**       | Entrada validada no backend           |
| **CORS**            | Configurado para domínios autorizados |

---

## 📱 Tecnologias Utilizadas

- **Backend:** Node.js + Express.js + TypeScript
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT
- **Armazenamento:** AWS S3 (ou LocalStack em dev)
- **Containerização:** Docker

---

**Última atualização:** janeiro de 2025
