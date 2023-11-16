import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ ...todo}, ...prevTodos]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prev) => 
        prev.id === id ? todo : prev
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prev) => prev.id !== id));
  };
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prev) => 
        prev.id === id
          ? { ...prev, completed: !prev.completed }
          : prev
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); //access data by key("todos")
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  },[]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); //sets data in key value format
  },[todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete}}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
