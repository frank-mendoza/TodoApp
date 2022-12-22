import React from 'react'
import { getDatabase } from 'firebase/database';
import TodoForm from './components/TodoForm.tsx'
import TodoList from './components/TodoList.tsx'


import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
import firebaseApp from "./firebase.ts";

import './styles/main.scss'
const App = () => {
  const db = getDatabase(firebaseApp);

  return (
    <div className='container-sm container-md align-items-start main'>
      <TodoList db={db}/>
      <TodoForm db={db}/>
    </div>
  )
}

export default App