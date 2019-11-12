import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";
import "./main.css";
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = "todoApp.todos";

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1>Task List</h1>
      <input id="NewTaskInput" ref={todoNameRef} type="text" />
      <button className="ToolButtons" onClick={handleAddTodo}>
        Add Todo
      </button>
      <button onClick={emptyTodoList}>Clear Completed Todos</button>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        addTodoComment={addTodoComment}
      />
      <div id="TodosLeft">
        {" "}
        {todos.filter(todo => !todo.completed).length} Left Todo
      </div>
    </>
  );
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    todoNameRef.current.value = null;
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          completed: false,
          comments: []
        }
      ];
    });
  }
  function emptyTodoList(e) {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    console.log("newtodos" + newTodos.find(todo => todo.id === id).completed);
  }
  function addTodoComment(id, comment) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.comments.push({ id: uuidv4(), comment: comment });
    setTodos(newTodos);
  }
}

export default App;
