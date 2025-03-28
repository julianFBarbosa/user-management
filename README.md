# Desafio Técnico - Desenvolvedor Fullstack Pleno

Este projeto é uma solução para o desafio técnico de desenvolvimento de uma API RESTful para gerenciamento de usuários. O objetivo é demonstrar boas práticas de código, organização e uso de tecnologias modernas.

## Tecnologias Utilizadas

- **Node.js** com **Express.js**: Framework para construção de APIs rápidas e escaláveis.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados.
- **Prisma**: ORM para interação com o banco de dados.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **JWT (JSON Web Token)**: Implementação de autenticação segura.

## Endpoints da API

### Autenticação
- **POST /register**: Cadastro de usuário (nome, email, senha).
- **POST /login**: Login do usuário (retorna um JWT válido).

### Gestão de Usuários
- **GET /users**: Lista todos os usuários (apenas para usuários autenticados). O CPF é retornado de forma anonimizada (ex.: ***.456.789**).

## Padrões Seguidos

- **Código Limpo**: Organização e legibilidade priorizadas.
- **Boas Práticas com TypeScript**: Tipagem rigorosa e uso de interfaces.
- **Autenticação Segura**: Implementação de JWT para proteger os endpoints.
- **Testes Unitários**: Cobertura básica com Jest para validar funcionalidades.
- **Uso Adequado de Git**: Histórico de commits claro e organizado.

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 22 ou superior)
- [Docker](https://www.docker.com/)
- [Pnpm](https://pnpm.io/pt/) ou [yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/julianFBarbosa/user-management.git
   cd user-management
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   # ou
   yarn install
   ```

3. Rode o banco de dados através do Docker:
   ```bash
   docker-compose up -d
   ```

4. Dê push no banco de dados:
   ```bash
   pnpm prisma db push
   # ou
   yarn prisma db push
   ```

5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   pnpm start:dev
   # ou
   yarn start:dev
   ```

6. Acesse a API em `http://localhost:3000`.

## Testes

Para rodar os testes unitários:
```bash
pnpm test
# ou
yarn test
```

## Estrutura do Projeto

```
/src
  ├── api/               # Endpoints e controladores
  ├── common/            # Configurações e utilitários
  ├── entities/          # Definições de entidades e DTOs
  ├── middlewares/       # Middlewares personalizados
  ├── prisma/            # Configuração do Prisma
  ├── services/          # Lógica de negócios
  └── index.ts           # Ponto de entrada
/tests                   # Testes unitários
```

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para dúvidas ou feedback, entre em contato pelo e-mail [barbosabjf@gmail.com].
