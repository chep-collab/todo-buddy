import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;




