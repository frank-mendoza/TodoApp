import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { FormCheck, Spinner } from "react-bootstrap";

import { Todo } from "../types";

const TodoList = ({ db }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const todoRef = ref(db, "/todos");

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: Todo[] = [];

      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      }


      setTodoList(newTodoList);
    });
    setTimeout(() => {
      setLoading(true)
    }, 500)
    setLoading(false)
  }, [db]);

  const changeTodoCompletion = (todo: Todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { done: !todo.done });
  };

  return (
    <div className="mb-5">
      <h1 className="fs-2 text-center mt-5">Todo List</h1>
      {!loading ?
        <div className="spinner">
          <Spinner color="warning" className=" mt-5" />
        </div>
        :
        todoList.map((todo, index) => {
          return (
            <div className="row ">
              <FormCheck
                key={index}
                className="mb-2 col-8"
                label={todo.title}
              />

              <div className="col-4 mb-2 d-flex justify-content-between">
                <input
                  type="checkbox"
                  className="custom form-check-input"
                  name="custom"
                  checked={todo.done}
                  onChange={() => changeTodoCompletion(todo)} />

                <div className="icons edit"></div>
                <div className="icons delete"></div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default TodoList;