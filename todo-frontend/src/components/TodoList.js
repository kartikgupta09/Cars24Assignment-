import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete, completeTaskHandler }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={todo.id} index={index} todo={todo} onEdit={onEdit} onDelete={onDelete} completeTaskHandler={completeTaskHandler} />
      ))}
    </div>
  );
};

export default TodoList;