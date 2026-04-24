<p align="center">
  <img src="https://raw.githubusercontent.com/nestjs/nest/master/content/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<h1 align="center">API - Gestão de Usuários e Pedidos</h1>

<p align="center">
  API REST construída com NestJS para gerenciamento de usuários e pedidos com autenticação JWT.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/npm-v11.1.19-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/downloads-39M%2Fmonth-brightgreen?style=flat-square" />
</p>

---

## 🧠 Visão Geral

Sistema backend que permite:

* **Cadastro** de usuários
* **Login** com autenticação JWT
* **CRUD** de usuários
* **CRUD** de pedidos
* **Relacionamento** entre usuários e pedidos
* **Proteção** de rotas

---

## 🛠️ Tecnologias

* **NestJS**
* **Prisma ORM**
* **PostgreSQL**
* **JWT**
* **Bcrypt**
* **Jest**

---

## ⚙️ Setup

### 1. Requisitos
* Node.js e npm instalados.
* Docker (opcional, para o banco de dados).

### 2. Instalação
```bash
# Instalar dependências
npm install

# Configurar banco de dados (Prisma)
npx prisma migrate dev
