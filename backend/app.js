const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    return res.status(200).json({ token: 'mock-token' });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware for protected /todos routes
app.use('/todos', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === 'Bearer mock-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// GET /todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const todo = { id: nextId++, title, description };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Item not found' });
  todo.title = title || todo.title;
  todo.description = description || todo.description;
  res.status(200).json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = app;