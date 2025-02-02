import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useTodo } from "../components/context/TodoContexts";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const TodoList = () => {
  const { state, dispatch } = useTodo();
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    text: "",
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({
        type: "ADD_TODO",
        payload: { id: Date.now(), text: newTodo, completed: false },
      });
      setNewTodo("");
    }
  };

  const handleEditTodo = (id, text) => {
    // const newText = prompt("Edit Todo:", text);
    if (text) {
      dispatch({ type: "EDIT_TODO", payload: { id, text } });
      setIsEditing(false);
      setNewTodo("");
    }
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return false;
  });

  return (
    <div
      className={`flex flex-col items-center w-full min-h-screen py-10 px-4 md:px-16 lg:px-32 ${
        state.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-lg shadow-md p-6 ${
          state.theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        <header className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h1 className="text-xl md:text-2xl font-bold">TO DO</h1>
          <button
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            className={`px-4 py-2 rounded cursor-pointer ${
              state.theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {state.theme === "dark" ? <IoSunnyOutline /> : <FaRegMoon />}
          </button>
        </header>

        <section
          className={`mt-4 flex items-center gap-2 rounded-lg shadow-md px-4 py-2 ${
            state.theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Create a new todo..."
            className={`flex-1 border-none outline-none text-sm md:text-base placeholder-gray-400 text-gray-700 ${
              state.theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
          />
          <button
            onClick={() => {
              isEditing
                ? handleEditTodo(editData.id, newTodo)
                : handleAddTodo();
            }}
            className="bg-blue-500 text-white px-10 py-2 rounded text-sm md:text-base cursor-pointer font-bold"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </section>

        <ul className="mt-6 flex flex-col gap-3 overflow-auto max-h-[60vh]">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
                state.theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <span
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch({ type: "TOGGLE_COMPLETE", payload: todo.id })
                  }
                  className="text-green-500 cursor-pointer"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    console.log(editData);

                    setEditData({
                      id: todo.id,
                      text: todo.text,
                    });
                    setNewTodo(todo.text);
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
                  }
                  className="text-red-500 cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <footer className="mt-4 flex flex-wrap items-center justify-between text-sm md:text-base">
          <span>{state.todos.length} items left</span>
          <div className="flex gap-4">
            <button
              onClick={() => setFilter("all")}
              className={` cursor-pointer ${
                filter === "all" ? "underline font-semibold" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`cursor-pointer ${
                filter === "active" ? "underline font-semibold" : ""
              } `}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={` cursor-pointer ${
                filter === "completed" ? "underline font-semibold" : ""
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
            className="text-red-500 cursor-pointer"
          >
            Clear Completed
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TodoList;
