import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./model";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineDone } from "react-icons/md";
import "./styles.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  //mark todo as done
  const handleDone = (id: number) => {
    //console.log(id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  //delete todo
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //edit todo
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  //for auto focus on edit
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          type="text"
          ref={inputRef}
          value={editTodo}
          className="input-field"
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : (
        <span
          className={
            todo.isDone ? "strike todos__single--text" : "todos__single--text"
          }
        >
          {todo.todo}
        </span>
      )}

      <div className="">
        <span className="icon" onClick={() => setEdit(!edit)}>
          <FaEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <MdDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
