import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SingleTodo from './SingleTodo'; 
// Adding todos
function AddTodo({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    addTodo(newTodo);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
}

// Viewing todos
function ViewTodos({ todos }) {
  return (
    <div>
      <h2>View Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Deleting todos
function DeleteTodo({ todos, deleteTodo }) {
  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <div>
      <h2>Delete Todo</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{' '}
            <button
              onClick={() => handleDelete(todo.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const markCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Todo App
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view">
                View Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/delete">
                Delete Todos
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add" element={<AddTodo addTodo={addTodo} />} />
          <Route path="/view" element={<ViewTodos todos={todos} />} />
          <Route path="/delete" element={<DeleteTodo todos={todos} deleteTodo={deleteTodo} />} />
          <Route path="/todo/:id" element={<SingleTodo todos={todos} markCompleted={markCompleted} />} />
          <Route path="/" element={<h2>Welcome to Todo App</h2>} />
          <Route
          path="/todo/:id"
          element={<SingleTodo todos={todos} markCompleted={markCompleted} />}
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
