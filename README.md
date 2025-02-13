# 🚀 Training & Researching NestJS

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS">
</p>  
_A Progressive Node.js framework for building efficient and scalable applications._

---

## 📌 Getting Started

### ⚙️ 1. Setup Environment Variables
Create `.env` files for both Docker Compose and the NestJS backend. Example environment files are provided with the `.example` postfix.

### 🐳 2. Run Database Container
Ensure Docker is installed, then run:
```sh
docker compose up --build --detach
```

### 🚀 3. Start the Backend
Navigate to the `backend` directory and run:
```sh
npm run start:dev
```

---

## 📁 Project Structure
```
Training_Researching_Nestjs/
├── backend/                  # NestJS Backend Application
├── docker-compose.yml         # Docker Compose Configuration
├── .env.example               # Example Environment Variables
└── README.md                  # Project Documentation
```

---

## 🛠️ Technologies Used
✅ **NestJS** - A progressive Node.js framework  
✅ **TypeORM** - ORM for database management  
✅ **PostgreSQL** - Relational database  
✅ **Docker** - Containerization platform  
✅ **JWT (JSON Web Token)** - Authentication mechanism  

---

## 🤝 Contribution
Feel free to fork this repository and submit a pull request. We appreciate all contributions! 🎉

---

## 📜 License
This project is licensed under the **MIT License**.

💡 _Happy Coding! 🚀_

