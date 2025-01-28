import React from "react";
import { TodoProvider } from "./components/context/TodoContexts";
import TodoList from "./page/TodoList";

const App = () => {
  return (
    <TodoProvider>
      <div className="container max-w-full ">
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
