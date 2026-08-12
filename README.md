# Task Manager

A full-stack task management application that allows users to create, update, complete, and delete tasks. Built as part of the Amperor Tech Summer Internship Program 2026 — Node.js/React Track.

## Features

- Create new tasks with title and optional description
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks by status (All / Active / Completed)
- Real-time progress tracking with completion percentage
- Responsive, modern UI with smooth animations

## Tech Stack

- **Backend:** Node.js v22, Express.js 5
- **ORM:** Prisma 6
- **Database:** PostgreSQL
- **Frontend:** React 18, Vite
- **Styling:** Custom CSS (glassmorphism design)

## Project Structure

task-manager/
├── server/ # Express backend
│ ├── prisma/ # Database schema
│ ├── index.js # Main server file
│ └── prismaClient.js
├── client/ # React frontend
│ └── src/
│ ├── App.jsx
│ └── App.css
└── README.md

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL installed and running

### 1. Clone the repository
```bash
git clone <https://github.com/mahnoor-masood/task-manager.git >
cd task-manager
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder (use `.env.example` as reference):
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager?schema=public"

Run database migrations:
```bash
npx prisma migrate dev
```

Start the backend:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description | Body Example |
|--------|----------|--------------|---------------|
| GET | `/tasks` | Get all tasks | — |
| POST | `/tasks` | Create a new task | `{ "title": "Learn Prisma", "description": "Complete backend setup" }` |
| PUT | `/tasks/:id` | Update a task | `{ "title": "...", "description": "...", "completed": true }` |
| DELETE | `/tasks/:id` | Delete a task | — |

## Deployment

- Backend deployed on: [(https://task-manager-production-20b1.up.railway.app)]
- Frontend deployed on: [https://task-manager-teal-kappa-87.vercel.app]
- Live App: [https://task-manager-teal-kappa-87.vercel.app]

## Author

[Mahnoor Masood]