# 🎯 Tailoring Fabric Inventory System (Full Stack Deployment)

A complete full-stack inventory management system built using **React.js** for the frontend, **Express.js** for the backend, and **PostgreSQL** hosted securely on **AWS RDS**. The entire application is deployed on an **AWS EC2 instance** with secure access and environment configuration.

---

## 🚀 Features

- 🧾 Add, edit, delete fabric inventory records
- 📊 Auto-updating table with smooth UI transitions
- 🔐 Secure API communication with Express
- 🌐 Hosted backend on AWS EC2 and database on AWS RDS
- 🎨 Tailwind CSS animations and responsiveness

---

## 🧱 Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | React.js + Axios + Tailwind CSS |
| Backend    | Express.js + Sequelize (ORM)    |
| Database   | PostgreSQL (hosted on AWS RDS)  |
| Hosting    | AWS EC2 (Ubuntu)               |
| VPC Setup  | Custom VPC, Subnets, Security Groups |

---

## 🏗️ Project Architecture

[ React Frontend ]
↕ REST (Axios)
[ Express.js API (hosted on EC2) ]
↕ Sequelize (JDBC)
[ PostgreSQL DB (AWS RDS, Private Subnet) ]

yaml
Copy
Edit

---

## 🌐 Deployment Flow (AWS)

1. **Frontend** is built using Vite (`npm run build`)
2. **Backend** is hosted on **AWS EC2** using Node.js
3. **PostgreSQL** is hosted on **AWS RDS** inside a **private subnet**
4. Backend connects to RDS securely using environment variables and VPC-level restrictions

---

## 🔐 Environment Configuration (`.env` for Backend)

```env
PORT=3001
DB_HOST=<your-rds-endpoint>.rds.amazonaws.com
DB_PORT=5432
DB_NAME=<your-database-name>
DB_USER=<your-db-username>
DB_PASS=<your-db-password>
```
📦 Backend Setup (Express + Sequelize)
SSH into EC2:


ssh -i your-key.pem ubuntu@your-ec2-public-ip
Install backend dependencies:

cd backend
npm install
Create .env file with RDS details

Start the server:

node index.js
The backend is now running on:
http://<EC2-PUBLIC-IP>:3001/api/fabrics

🖥️ Frontend Setup (React)
Local dev or EC2:

cd frontend
npm install
npm run build
Serve with NGINX or any static server:


npm install -g serve
serve -s dist
Make sure the frontend Axios base URL matches backend EC2 IP:


axios.get('http://<EC2-PUBLIC-IP>:3001/api/fabrics');

🛡️ AWS Security & Network Setup
🔹 VPC Design
Component: VPC
CIDR Block: 10.0.0.0/16
Description: Custom VPC

Component: Public Subnet
CIDR Block: 10.0.1.0/24
Description: EC2 + NAT Gateway

Component: Private Subnet
CIDR Block: 10.0.2.0/24
Description: RDS

🔹 Security Groups
Resource: EC2
Port: 22
Source: Your IP

Resource: EC2
Port: 3001
Source: Your IP or 0.0.0.0/0 (for development only)

Resource: RDS
Port: 5432
Source: EC2's Security Group ID

🔍 Testing API
Test the backend directly:

curl http://<EC2-PUBLIC-IP>:3001/api/fabrics
Or use Postman for full CRUD testing.

🛠️ To-Do / Improvements
 Use NGINX reverse proxy for API

 Add authentication (JWT or OAuth2)

 Store DB credentials in AWS Secrets Manager

 Enable SSL between EC2 ↔ RDS

 Dockerize frontend/backend

💡 Credits
Created by Bharathi S 
Deployed on AWS with custom networking and security architecture.
