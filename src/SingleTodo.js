import React from 'react';
import { useParams } from 'react-router-dom';

function SingleTodo({ todos, markCompleted }) {
  const { id } = useParams();
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return <div>Todo not found.</div>;
  }

  const handleCheckboxChange = () => {
    markCompleted(todo.id);
  };

  return (
    <div>
      <h2>Todo Details</h2>
      <h3>Title: {todo.title}</h3>
      <p>Description: {todo.description}</p>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
}

export default SingleTodo;
