# fc-backend

# 🏗️ Clean Architecture Node.js Project

Este é um projeto backend desenvolvido em **Node.js** com **TypeScript**, utilizando os princípios de **Arquitetura Limpa** e **SOLID** para garantir modularidade, manutenibilidade e escalabilidade.

---

## 📂 Estrutura de Pastas

A estrutura do projeto segue os princípios de separação de responsabilidades:

src/ 
│ ├── application/ # Casos de uso e lógica de aplicação 
│   ├── use-cases/ # Implementações de casos de uso 
│   └── dtos/ # Objetos de transferência de dados 
│ ├── domain/ # Regras de negócio (core do sistema) 
│   ├── entities/ # Entidades da aplicação 
│   ├── interfaces/ # Interfaces para dependências externas 
│   └── services/ # Lógica de domínio específica 
│ ├── infrastructure/ # Implementações e detalhes externos 
│   ├── database/ # Repositórios e configurações de banco de dados 
│   ├── services/ # Implementações de serviços externos 
│   └── config/ # Configurações gerais (ex.: variáveis de ambiente) 
│ ├── interfaces/ # Interface com o mundo externo 
│   ├── controllers/ # Controladores da aplicação 
│   ├── routes/ # Definições de rotas 
│   └── http/ # Configurações do servidor HTTP 
│ ├── shared/ # Código compartilhado entre camadas 
│   ├── utils/ # Funções utilitárias 
│   ├── errors/ # Tratamento de erros 
│   └── constants/ # Constantes globais 
│ └── main.ts # Ponto de entrada da aplicação

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset de JavaScript para maior tipagem e segurança.
- **Express**: Framework para criação de APIs.
- **Prisma**: ORM para interação com banco de dados.
- **InversifyJS**: Gerenciamento de injeção de dependências.
- **Jest**: Testes unitários.
- **ESLint/Prettier**: Padronização de código.

---

## 🔧 Configuração e Execução

### 1️⃣ Pré-requisitos
- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- Banco de dados (ex.: PostgreSQL, MySQL)

### 2️⃣ Instalar Dependências
npm install
yarn install


### 3️⃣ Configurar Variáveis de Ambiente
DATABASE_URL=seu_banco_de_dados
PORT=3000

### 4️⃣ Rodar o Projeto
npm run dev
yarn dev

### 📚 Referências
Clean Architecture (Robert C. Martin)
SOLID Principles

### 👥 Autores
Guilherme Vesentini - Desenvolvedor Principal
