# Guia de Uso da API de Exames

## Opções para Criar Exames

### 1. Criar Exame SEM Arquivos (JSON Puro)

**Endpoint:** `POST /exams/create-json`

**Formato que você está usando atualmente:**
```json
{
  "name": "coleta de sangue",
  "date": "2025-10-21", 
  "type": "BLOOD_TEST",
  "specialty": "CARDIOLOGY",
  "files": "[object File]",
  "observations": "",
  "userId": "18c929d4-8361-4188-8dd5-e89105c60d4c"
}
```

**Funciona, mas não processa arquivos.** O sistema ignora `"[object File]"` e cria apenas o exame.

---

### 2. Criar Exame COM Arquivos (Multipart Form-Data)

**Endpoint:** `POST /exams/create-with-files`

**Formato:** Multipart/form-data

```bash
curl -X POST http://localhost:8000/exams/create-with-files \
  -F "name=coleta de sangue" \
  -F "date=2025-10-22" \
  -F "type=BLOOD_TEST" \
  -F "specialty=CARDIOLOGY" \
  -F "observations=Exame de rotina" \
  -F "userId=18c929d4-8361-4188-8dd5-e89105c60d4c" \
  -F "files=@arquivo1.jpg" \
  -F "files=@arquivo2.pdf"
```

---

### 3. Criar Exame COM Arquivos Base64 (JSON)

**Endpoint:** `POST /exams/create-json`

**Formato:** JSON com arquivos codificados em base64

```json
{
  "name": "coleta de sangue",
  "date": "2025-10-21",
  "type": "BLOOD_TEST", 
  "specialty": "CARDIOLOGY",
  "observations": "Exame de rotina",
  "userId": "18c929d4-8361-4188-8dd5-e89105c60d4c",
  "files": [
    {
      "filename": "exame1.jpg",
      "mimeType": "image/jpeg",
      "content": "/9j/4AAQSkZJRgABAQEAYABgAAD..." // base64 do arquivo
    },
    {
      "filename": "resultado.pdf", 
      "mimeType": "application/pdf",
      "content": "JVBERi0xLjQKJeLjz9MKMSAwIG9iag..." // base64 do arquivo
    }
  ]
}
```

---

## Como Converter Arquivo para Base64 (Frontend)

### JavaScript/HTML:

```javascript
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove o prefixo "data:image/jpeg;base64," 
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

// Exemplo de uso:
async function uploadExam(formData) {
  const files = [];
  
  for (let file of formData.files) {
    const base64Content = await fileToBase64(file);
    files.push({
      filename: file.name,
      mimeType: file.type,
      content: base64Content
    });
  }

  const examData = {
    name: formData.name,
    date: formData.date,
    type: formData.type,
    specialty: formData.specialty,
    observations: formData.observations,
    userId: formData.userId,
    files: files
  };

  const response = await fetch('/exams/create-json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(examData)
  });

  return response.json();
}
```

---

## Resposta da API

Todas as rotas retornam o mesmo formato:

```json
{
  "message": "Exame criado com sucesso",
  "exam": {
    "id": "uuid-do-exame",
    "name": "coleta de sangue",
    "type": "BLOOD_TEST", 
    "date": "2025-10-21T00:00:00.000Z",
    "specialty": "CARDIOLOGY",
    "observations": "",
    "userId": "uuid-do-usuario",
    "file": [
      {
        "id": "uuid-do-arquivo",
        "filename": "exame1.jpg",
        "mimeType": "image/jpeg",
        "size": 1024,
        "path": "exams/userId/timestamp-exame1.jpg",
        "url": "http://localhost:4566/bucket/path...",
        "uploadedAt": "2025-10-21T20:30:00.000Z"
      }
    ],
    "user": {
      "id": "uuid-do-usuario", 
      "name": "Nome do Usuario",
      "email": "email@exemplo.com"
    }
  }
}
```

---

## Outras APIs Disponíveis

- `GET /exams/user/:userId/files` - Listar exames de um usuário
- `GET /exams/file/:fileId/download` - Obter URL de download temporária

---

## Resumo das Soluções

1. **Sua situação atual:** Use `/exams/create-json` - funciona, mas sem arquivos
2. **Para incluir arquivos:** Ajuste o frontend para enviar base64 ou use multipart/form-data
3. **Mais fácil:** Mude para multipart/form-data no frontend