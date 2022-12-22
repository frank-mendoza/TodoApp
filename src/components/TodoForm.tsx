import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { ref, push } from "firebase/database";

// Import firebase configuration from firebase.ts file
// @ts-ignore

const TodoForm = ({db}) => {

  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target
    let value = target.value
    
    setTitle(value);
  };

  const addTodo = () => {
    const todoRef = ref(db, "/todos");
    const todo = {
      title,
      done: false,
    };

    setTitle('')

    push(todoRef, todo);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Control
        onChange={handleChange}
        value={title}
      />
      <Button type="submit"
        className="mt-3"
        disabled={title === '' ? true : false}
        onClick={addTodo}
      >
        Submit
      </Button>
    </Form>
  )
}

export default TodoForm