# Todo App

A simple full-stack Todo application built with **Node.js**, **Express**, **PostgreSQL**, and vanilla **JavaScript**.

The project demonstrates basic CRUD operations, client–server interaction, and clean UI logic without frontend frameworks.

---

## Features

- Add, edit, delete todos
- Mark todos as completed
- Filter todos: All / Active / Completed
- Dark / light theme toggle
- Theme and filter preferences saved in `localStorage`

---

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- pg

### Frontend

- HTML
- CSS
- Vanilla JavaScript

---

## Project Structure

```text
todo-app/
├── backend/
│   ├── routes/
│   │   └── todos.js
│   ├── db.js
│   └── index.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env
├── .gitignore
└── README.md
```

---

## Setup and Run

### 1. Clone repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app

```

### 2. Install dependencies

```bash
npm install

```

### 3. Create `.env` file with your PostgreSQL credentials

```env
PORT=8080
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo

```

### 4. Create database table

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false
);

```

### 5. Run the server

```bash
node index.js

```

### 6. Open frontend

Open frontend/index.html in your browser.

---

## Skills Practiced

- REST API design
- Express routing
- PostgreSQL CRUD operations
- Frontend state management
- DOM manipulation
- Working with Git and GitHub
- Writing meaningful commits

---

## Future Improvements

- Deployment
- Authentication
- Drag & drop todos
- Animations
- Mobile optimization
