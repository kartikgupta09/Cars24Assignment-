import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa';

const TodoItem = ({ todo, onEdit, onDelete, completeTaskHandler, index }) => {
  return (
    <Card className="mb-3 mt-3 todo-item-card p-3" style={{ background: todo.completed ? "linear-gradient(135deg, #85f5b0 0%, #0aa64d 100%)": "white"}}>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small>{todo.date}</small>
              <h5 className="mb-1">{todo.title}</h5>
              <p className="mb-0">{todo.body}</p>
            </div>
            <div className="d-flex justify-content-between">
            {todo.completed ? null : <Button variant="primary" className='m-1' onClick={() => onEdit(todo.id)}><FaEdit /></Button>}
              <Button variant="primary" className='m-1' onClick={() => onDelete(todo.id)}><FaTrashAlt /></Button>
              {todo.completed ? null : <Button variant="primary" className='m-1' onClick={() => completeTaskHandler(index)}><FaCheck /></Button>}
            </div>
          </div>
    </Card>
  );
};

export default TodoItem;