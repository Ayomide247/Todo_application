<div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-md w-full max-w-md">
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="checkbox"
      className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-purple-300"
      // checked={todo.completed}
    />
    <span>Complete Todo App on Frontend Mentor </span>
  </label>
</div>;


import React, { useState } from "react";
import { useTodo } from "../components/context/TodoContexts";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const TodoList = () => {
  const { state, dispatch } = useTodo();
  const [newTodo, setNewTodo] = useState("");

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
    const newText = prompt("Edit Todo:", text);
    if (newText) {
      dispatch({ type: "EDIT_TODO", payload: { id, text: newText } });
    }
  };

  return (
    <div
      className={`p-4 ${
        state.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      } min-h-screen`}
    >
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 px-4 py-2 rounded border"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_COMPLETE", payload: todo.id })
                }
                className="text-green-500"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleEditTodo(todo.id, todo.text)}
                className="text-blue-500"
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: todo.id })
                }
                className="text-red-500"
              >
                <AiOutlineDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
