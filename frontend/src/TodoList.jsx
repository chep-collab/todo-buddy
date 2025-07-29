import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:5000/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const handleCreateOrUpdate = async () => {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:5000/api/todos/${editId}` : 'http://localhost:5000/api/todos';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    setTitle('');
    setDescription('');
    setEditId(null);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateOrUpdate}>{editId ? 'Update' : 'Create'} Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.description}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;