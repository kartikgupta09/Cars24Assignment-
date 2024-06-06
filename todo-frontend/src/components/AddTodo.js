import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddTodo = ({ addTodo, editToDoData, updateToDos }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if(editToDoData) {
      const {body: editBody, title: editTitle} = editToDoData;
      setTitle(editTitle);
      setBody(editBody);
    }
  }, [editToDoData])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editToDoData) {
      updateToDos({...editToDoData, title, body});
    } else {
      addTodo({
        title,
        body
      });
    }
    setTitle('');
    setBody('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value?.trim())}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBody" className="mt-3">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value?.trim())}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        {`${editToDoData ? 'Edit' : 'Add'} Todo`}
      </Button>
    </Form>
  );
};

export default AddTodo;
