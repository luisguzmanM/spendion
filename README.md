# Spendion 💸

[![Angular](https://img.shields.io/badge/Angular-16.x-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

**Spendion** is a modern personal finance and expense-tracking web application built to help individuals take full control of their money. It simplifies budgeting, tracks daily expenses, and gives you a clear, real-time overview of your financial health—all in an intuitive, distraction-free interface.

---

## 💡 What You Can Do with Spendion

- **🎯 Budget by Category:** Set custom monthly spending targets for categories like food, housing, entertainment, or transport, and track how much you have left in real time.
- **💸 Log & Manage Expenses:** Easily record daily transactions, edit records, and categorize your spending to understand where your money actually goes.
- **💵 Track Your Income:** Keep your total cash flow accurate by logging recurring or one-off income streams.
- **📊 Instant Financial Overview:** Get an at-a-glance summary of your total income, current expenses, and net balance directly on your dashboard.
- **🔒 Private & Secure:** Your financial data is yours alone. Secured with token-based authentication (JWT), encrypted credentials, and email-verified account registration.

---

## 🛠️ Tech Stack

- **Frontend:** Angular 16, Angular Material, RxJS, Custom SCSS/CSS.
- **Backend:** Node.js, Express.js, PostgreSQL (`pg` pool).
- **Security:** JSON Web Tokens (JWT), `simple-encryptor` encryption.
- **Architecture:** Decoupled Single Page Application (SPA) communicating via RESTful API.

---

## 📁 Project Structure

```text
spendion/
├── backend/          # Node.js + Express REST API with PostgreSQL
├── frontend/         # Angular 16 client application
├── .gitignore        # Root Git ignore rules
└── README.md         # Project documentation
```

---

## 🚀 Running Locally

### Prerequisites
- **Node.js** (v18.x recommended)
- **PostgreSQL** installed and running
- **npm**

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your local PostgreSQL credentials and secret keys
npm run dev
```
*API runs at `http://localhost:3000`.*

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```
*App runs at `http://localhost:4200`.*

---

## 🌐 Live Application

The application is deployed and available to use here:

👉 **[Launch Spendion App](https://your-deployment-url-here.com)** *(replace with your live URL)*

---

## 👨‍💻 Author

**Luis Guzmán**  
- GitHub: [@luisguzmanM](https://github.com/luisguzmanM)  
- Email: guzmanluis.lg@gmail.com
