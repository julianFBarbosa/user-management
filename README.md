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
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/julianFBarbosa/user-management.git
   cd express-typescript-2024
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o banco de dados:
   - Crie um banco de dados PostgreSQL.
   - Configure a variável `DATABASE_URL` no arquivo `.env` (use `.env.example` como referência).

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse a API em `http://localhost:3000`.

## Testes

Para rodar os testes unitários:
```bash
npm test
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
