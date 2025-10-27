# Configurações AWS Local

Este documento contém as configurações locais da AWS utilizadas no projeto.

Documentação que foi seguida: https://docs.docker.com/guides/localstack/ 

## Credenciais (~/.aws/credentials)
```ini
[default]
aws_access_key_id = test
aws_secret_access_key = test
```

## Configuração (~/.aws/config)
```ini
[default]
region = us-east-1
output = json
```

## Endpoint LocalStack
- URL: http://localhost:4566

## Como usar estas configurações
1. As credenciais estão configuradas no arquivo `~/.aws/credentials`
2. As configurações regionais estão no arquivo `~/.aws/config`
3. Para desenvolvimento local, utilize o comando `awslocal` ao invés de `aws`
4. O endpoint local do S3 é `http://localhost:4566`

## Verificando as configurações
Para verificar se as configurações estão corretas, use:
```bash
awslocal configure list
```

Observação: Estas são credenciais de desenvolvimento local e não devem ser usadas em produção.