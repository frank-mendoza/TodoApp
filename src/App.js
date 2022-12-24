import React, { useState } from 'react'
import { getDatabase } from 'firebase/database';
import TodoForm from './components/TodoForm.tsx'
import TodoList from './components/TodoList.tsx'


import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
import firebaseApp from "./firebase.ts";
import { ref, push } from "firebase/database";

import './styles/main.scss'
const App = () => {
  const db = getDatabase(firebaseApp);

  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    let target = e.target
    let value = target.value

    setTitle(value);
  };

  const addTodo = () => {
    const todoRef = ref(db, "/todos");
    const todo = {
      title: title,
      done: false,
    };

    setTitle('')

    push(todoRef, todo);
  };

  return (
    <div className='container-sm py-4 container-md align-items-start main'>
      <TodoList
        db={db}
      />
      <TodoForm
        title={title}
        handleChange={handleChange}
        addTodo={addTodo}
      />
    </div>
  )
}

export default App