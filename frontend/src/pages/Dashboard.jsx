import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setTodos(res.data))
    .catch((err) => alert('Failed to load todos'));
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;







