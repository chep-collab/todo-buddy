const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let idCounter = 1;

// Mock user for login
const validUser = { username: 'admin', password: 'password' };

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === validUser.username && password === validUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  const todo = { id: idCounter++, title, description };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (todo) {
    todo.title = title;
    todo.description = description;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

app.listen(5000, () => console.log('Server running on port 5000'));

