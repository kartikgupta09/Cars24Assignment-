import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { getDate } from './utils/common';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [editToDoData, setEditToDoData] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/articles');
      setTodos(response.data);
    } catch (error) {
      setError('There was an error fetching the todos!');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async ({title, body}) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/add', { title, body });
      setTodos([...todos, response.data]);
    } catch (error) {
      setError('There was an error adding the todo!');
      console.error(error);
    }
  };
    const editTodo = (id) => {
    setEditToDoData(todos.find(todo => todo.id === id));
  };
  
    const updateToDos = async (todoData) => {
    const todoIndex = todos.findIndex(todo => todo.id === todoData.id);
    const data = [...todos];
    const res = await axios.put('http://127.0.0.1:5000/articles/'+todoData.id, { title: todoData.title, body: todoData.body });
    data[todoIndex] = res.data;
    setTodos([...data]);
    setEditToDoData(null);
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/articles/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setError('There was an error deleting the todo!');
      console.error(error);
    }
  };

  const completeTaskHandler = (index) => {
    const todosData = [...todos];
    todosData[index] = {...todosData[index], completed: true};
    setTodos([...todosData]);
  }

  return (
   <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="todo-card mx-auto">
            <h2 className="text-center mb-4">{getDate()}</h2>
            <AddTodo addTodo={addTodo} editToDoData={editToDoData} updateToDos={updateToDos} />
            <TodoList todos={todos} onEdit={editTodo} onDelete={deleteTodo} completeTaskHandler={completeTaskHandler} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}