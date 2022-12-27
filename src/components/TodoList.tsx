import React, { useEffect, useState } from "react";
import { ref, onValue, update, set, remove } from "firebase/database";
import {
  Button,
  ButtonGroup,
  Form,
  FormCheck,
  ModalBody,
  Spinner,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { Todo } from "../types";

const TodoList = ({ db }) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState({
    id: "",
    show: false,
    title: "",
    status: false,
  });
  const [modal, setModal] = useState({
    id: "",
    show: false,
    title: "",
    status: false,
  });

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
      setLoading(true);
    }, 500);
    setLoading(false);
  }, [db]);

  const changeTodoCompletion = (todo: Todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { done: !todo.done });
  };

  const updateTodo = (record: any) => {
    const update = ref(db, "/todos/" + record.id);

    set(update, { title: modal.title });
    setModal({
      id: modal.id,
      show: false,
      title: modal.title,
      status: modal.status,
    });
  };

  const handleDelete = (todo: any) => {
    const deleteRef = ref(db, "/todos/" + todo.id);
    remove(deleteRef);

    setConfirm({
      id: "",
      show: false,
      title: "",
      status: false,
    });
  };

  const openModal = (todo: Todo) => {
    setModal({
      id: todo.id,
      show: true,
      title: todo.title,
      status: todo.done,
    });
  };

  const closeModal = () => {
    setModal({
      id: modal.id,
      show: false,
      title: modal.title,
      status: modal.status,
    });
  };

  const modalChange = (e: any) => {
    let target = e.target;
    let value = target.value;

    setModal({
      id: modal.id,
      title: value,
      status: modal.status,
      show: modal.show,
    });
  };

  const openConfirmModal = (todo: Todo) => {
    setConfirm({
      id: todo.id,
      show: true,
      title: todo.title,
      status: todo.done,
    });
  };

  return (
    <div className="pb-4">
      <h1 className="fs-2 text-center my-4 pb-4 border-bottom">
        Todo App With Firebase
      </h1>
      {!loading ? (
        <div className="spinner">
          <Spinner color="warning" className=" mt-5" />
        </div>
      ) : todoList.length === 0 ? (
        <p className="text-center text-muted mt-4 mb-2">Add new task or todo.</p>
      ) : (
        todoList.map((todo, index) => {
          return (
            <div
              className="row py-3 my-2 mx-0 w-100 border border-2 border-dark"
              key={index}
            >
              <FormCheck
                className={
                  todo.done
                    ? "name text-capitalize col-8 done"
                    : "name  col-8 text-capitalize"
                }
                label={todo.title}
              />

              <div className="col-4 d-flex justify-content-end gap-3 gap-sm-4 align-items-center">
                <input
                  type="checkbox"
                  className="custom form-check-input"
                  name="custom"
                  checked={todo.done}
                  onChange={() => changeTodoCompletion(todo)}
                />

                <div
                  className="icons edit"
                  onClick={() => openModal(todo)}
                ></div>
                <div
                  className="icons delete"
                  onClick={() => openConfirmModal(todo)}
                ></div>
              </div>
            </div>
          );
        })
      )}
      <Modal
        show={modal.show}
        onHide={() => closeModal()}
        backdrop="static"
        keyboard={false}
      >
        <ModalBody className="p-3 p-sm-4">
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-2 d-flex w-100 align-items-center">
              {" "}
              <br />
              <h4 className="mb-0 h5">Title: </h4>
              <h4 className="h5 mb-0 m-3 mt-0 text-capitalize">
                {modal.title}
              </h4>
            </div>
            <div className="mb-3 d-flex w-100 align-items-center">
              {" "}
              <br />
              <h4 className="mb-0 h5">Status:</h4>
              <h4 className="h5 mb-0 m-3 mt-0 text-capitalize">
                {modal.status ? "Done" : "Work in progress"}
              </h4>
            </div>

            <Form.Control
              onChange={modalChange}
              value={modal.title}
              className="border border-2 border-dark my-5 py-2 custom-input"
            />
            <div className="d-flex justify-content-between mt-4">
              <Button
                type="submit"
                size="lg"
                className=" btn btn-dark border-dark"
                onClick={() => updateTodo(modal)}
              >
                Submit
              </Button>
              <Button
                size="lg"
                className=" btn btn-danger border-danger"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <Modal show={confirm.show} backdrop="static" keyboard={false}>
        <ModalBody className="p-4">
          <h4 className="h4 text-danger text-center">
            Are you sure you want to delete <br /> "{confirm.title}"?
          </h4>
          <div className="d-flex justify-content-between mt-4">
            <Button
              className="bg-dark border-0"
              size="lg"
              onClick={() => handleDelete(confirm)}
            >
              Yes
            </Button>
            <Button
              size="lg"
              className="bg-danger border-0"
              onClick={() =>
                setConfirm({
                  id: confirm.id,
                  show: false,
                  title: confirm.title,
                  status: confirm.status,
                })
              }
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TodoList;
