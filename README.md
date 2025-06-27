A modern, responsive file storage application built with **Next.js App Router**, **PostgreSQL**, and **Tailwind CSS**, featuring:

- ✅ User authentication via `next-auth`
- ✅ Nested folder support
- ✅ File upload, deletion, and search
- ✅ PostgreSQL + Prisma ORM
- ✅ Vercel & Render deployment

---

## 🔗 Live Demo

🌐 [View Application](https://my-drive-clone.vercel.app)

---

## 🧱 Tech Stack

| Tech          | Usage                      |
|---------------|----------------------------|
| Next.js       | React framework (App Router) |
| Prisma        | Database ORM               |
| PostgreSQL    | Relational DB (Render)     |
| Tailwind CSS  | UI Styling                 |
| NextAuth.js   | Authentication             |
| Vercel        | Frontend Hosting           |
| Render        | PostgreSQL Hosting         |

---

## 🛠️ Features

- 🔐 **Secure login & register system**
- 🗂️ **Nested folders**
- ⬆️ **Upload files to any folder**
- 🔍 **Search files and folders**

---

## 📦 Installation (Local)

### 1. Clone the repository

```bash
git clone https://github.com/AIDELITE/my-drive-clone.git
cd driveclone
2. Install dependencies
bash
Copy
Edit
npm install
3. Setup .env file
Create a .env file in the root directory:

env
Copy
Edit
DATABASE_URL=postgresql://user:password@host:5432/driveclone
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
Use the external connection string from your Render PostgreSQL instance.

Generate a secret with:

bash
Copy
Edit
openssl rand -base64 32
4. Setup Prisma & database
bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
To inspect the DB schema:

bash
Copy
Edit
npx prisma studio
5. Run locally
bash
Copy
Edit
npm run dev
Visit http://localhost:3000
