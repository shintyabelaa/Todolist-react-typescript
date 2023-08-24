import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([
    { id: 1, text: "Learn Typescript", completed: false },
    { id: 2, text: "Build TodoListApps", completed: false },
  ]);
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    const newTodo: item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id: number) => {
    const uddatedTodos = todos.filter((todo) => todo.id != id);
    setTodos(uddatedTodos);
  };

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
  };

  const filteredTodos = filter === "completed" ? todos.filter(todo => todo.completed) : filter === "pending"
    ?todos.filter(todo => !todo.completed): todos;

  return (
    <div className="main-container">
      <h1>ToDo List</h1>
      <div className="add-list">
        <input
          type="text"
          placeholder="Add todo item"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Add</button>
      </div>
      <div className="menu-bar" tabIndex={0}>
        <h2 className="all" onClick={() => handleFilterChange("all")}>
          All
        </h2>
        <h2 className="pending" onClick={() => handleFilterChange("pending")}>
          Pending
        </h2>
        <h2
          className="completed"
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </h2>
      </div>
      <ul style={{ listStyleType: "none" }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "300px",
              padding: "0 30px",
              fontSize: "20px",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="colorful-checkbox"
            />
            <div style={{ flexGrow: 1, margin: "0 10px" }}>{todo.text}</div>
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{
                color: "rgb(167, 74, 119)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
