import React, { createContext, useReducer, useEffect } from "react";
import { todoReducer } from "../UseReducer";
const TodoContext = createContext();

const fetchedTodos = localStorage.getItem("todos");
const fetchedTheme = localStorage.getItem("theme");

const initialState = {
  todos: fetchedTodos ? JSON.parse(fetchedTodos) : [],
  theme: fetchedTheme || "light",
};

export const TodoProvider = ({ children }) => {
  ``;
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
    localStorage.setItem("theme", state.theme);
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => React.useContext(TodoContext);
