const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;

// Create task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message: "Description must be a string"
    });
  }

  const newTask = {
    id: currentId++,
    title: title.trim(),
    description: description ? description.trim() : "",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  let result = [...tasks];

  if (req.query.status) {
    const status = req.query.status;

    if (status !== "pending" && status !== "done") {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    result = result.filter((task) => task.status === status);
  }

  if (req.query.sort === "createdAt") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  res.status(200).json(result);
});

// Get single task
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.status(200).json(task);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  if (
    title === undefined &&
    description === undefined
  ) {
    return res.status(400).json({
      message: "Title or description is required"
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        message: "Title must be a non-empty string"
      });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({
        message: "Description must be a string"
      });
    }
    task.description = description.trim();
  }

  res.status(200).json(task);
});

// Mark task as done
app.patch("/tasks/:id/done", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.status = "done";

  res.status(200).json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully"
  });
});

// 405 for valid routes
app.all("/tasks", (req, res, next) => {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed"
    });
  }
  next();
});

app.all("/tasks/:id", (req, res, next) => {
  if (req.method !== "GET" && req.method !== "PUT" && req.method !== "DELETE") {
    return res.status(405).json({
      message: "Method Not Allowed"
    });
  }
  next();
});

app.all("/tasks/:id/done", (req, res, next) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      message: "Method Not Allowed"
    });
  }
  next();
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});