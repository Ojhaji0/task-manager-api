# Task Manager API

 REST API for managing personal tasks, built with Node.js and Express.

---

##  How to Run the Project

### 1. Clone or download the project

```bash
git clone <your-repo-link>
cd task-manager-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

Server will run at:

```text
http://localhost:3000
```

---

##  Task Structure

Each task contains:

* `id` (auto-generated)
* `title` (string)
* `description` (string)
* `status` (`pending` or `done`)
* `createdAt` (timestamp)

---

## 📡 API Endpoints

---

### 1. Create Task

**POST** `/tasks`

#### curl example

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Learn Express","description":"Build task manager API"}'
```

---

### 2. Get All Tasks

**GET** `/tasks`

```bash
curl http://localhost:3000/tasks
```

---

### 3. Get Task by ID

**GET** `/tasks/:id`

```bash
curl http://localhost:3000/tasks/1
```

---

### 4. Update Task

**PUT** `/tasks/:id`

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"title":"Learn Node.js","description":"Practice REST API"}'
```

---

### 5. Mark Task as Done

**PATCH** `/tasks/:id/done`

```bash
curl -X PATCH http://localhost:3000/tasks/1/done
```

---

### 6. Delete Task

**DELETE** `/tasks/:id`

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

##  Bonus Features

### Filter by status

```bash
curl "http://localhost:3000/tasks?status=pending"
```

### Sort by createdAt

```bash
curl "http://localhost:3000/tasks?sort=createdAt"
```

---

##  Error Handling

### 400 Bad Request

```json
{
  "message": "Title is required"
}
```

### 404 Not Found

```json
{
  "message": "Task not found"
}
```

### 405 Method Not Allowed

```json
{
  "message": "Method Not Allowed"
}
```

---

##  Tech Stack

* Node.js
* Express.js

---

