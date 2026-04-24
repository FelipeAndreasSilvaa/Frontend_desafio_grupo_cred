# Frontend — Gestão de Usuários e Pedidos

![Logo](https://vitejs.dev/logo.svg)

Interface React para gerenciamento de usuários e pedidos, com integração via API REST.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29-C21325?style=flat-square&logo=jest&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)

---

## 📋 Visão Geral

Interface web para gerenciamento de usuários e pedidos. Consome uma API REST com autenticação JWT e oferece uma experiência fluida e segura.

* **Login e Sessão:** Gerenciamento com JWT (JSON Web Token).
* **CRUD Usuários:** Cadastro, listagem, edição e exclusão.
* **CRUD Pedidos:** Gestão completa de ordens e histórico.
* **Segurança:** Rotas protegidas que exigem autenticação.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
| :--- | :--- |
| **React** | Biblioteca de UI |
| **Axios** | Requisições HTTP |
| **Jest** | Testes unitários |

---

## ⚙️ Setup

### Pré-requisitos
* Node.js 18+
* npm ou yarn
* API backend rodando em `http://localhost:3000`

### Instalação
```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Acesse a pasta do projeto
cd frontend

# Instale as dependências
npm install
