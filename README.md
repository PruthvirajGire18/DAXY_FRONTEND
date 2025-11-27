# 🔥 Saurabh Task Tracker (Admin + Intern Role Based Task Management)

A full-stack task tracker application where an **Admin (Yash)** creates & manages tasks for an **Intern (Saurabh)**.  
Intern can update task progress and create self-tasks.  
Authentication + Authorization implemented using JWT.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Context API + Custom UI Components |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Role-Based) |
| UI Design | Modern Dark Theme |

---

## 👥 User Roles & Features

### 🧑‍💼 Admin (Yash)
- Login
- Create / Edit / Delete tasks
- Assign tasks to intern
- View **ALL** tasks
- Dashboard analytics *(optional expand future)*

---

### 👨‍💻 Intern (Saurabh)
- Login
- View only **own assigned tasks**
- Update status: `todo → in-progress → done`
- Add progress notes
- Create self-tasks
- Self-tasks automatically marked with **Self Task badge**

---

## 🔑 Login Credentials

| Role | Email | Password |
|------|------|----------|
| Admin | `admin@yash.com` | `admin123` |
| Intern | `saurabh@example.com` | `saurabh123` |

---

## 🧩 Core API Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | All | Login using email & password |
| GET | /api/tasks | Admin / Intern | Get tasks based on role |
| POST | /api/tasks | Admin / Intern | Create tasks (intern → self-task only) |
| PATCH | /api/tasks/:id | Admin / Intern | Update task / Add progress note |
| DELETE | /api/tasks/:id | Admin only | Delete task |

---

## 📌 Task Schema

```js
{
  title: String,
  description: String,
  assignedTo: String,
  status: "todo" | "in-progress" | "done",
  priority: "low" | "medium" | "high",
  dueDate: Date,
  createdBy: ObjectId,
  isSelfTask: Boolean,
  progressNotes: [
    { text: String, createdAt: Date }
  ]
}