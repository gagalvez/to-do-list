import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

function createInitialTodos() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTask() {
    if (text.trim() === "") return;
    const newTask = { id: Date.now(), text, completed: false };
    setTodos([newTask, ...todos]);
    setText("");
  }

  function deleteTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function startEditing(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  function saveEdit() {
    if (editText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-700 shadow-xl shadow-sky-600/12 backdrop-blur-sm p-6 space-y-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              To-Do List
            </h1>
            <p className="text-sm text-slate-400">Organize your day</p>
          </div>
        </header>

        <TodoForm
          text={text}
          onChangeText={setText}
          onSubmit={addTask}
        />

        <section className="space-y-2 max-h-80 overflow-y-auto pr-1 mt-2">
          {todos.length === 0 ? (
            <p className="text-sm text-slate-500">You haven't added a task</p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editId === todo.id}
                  editText={editText}
                  onChangeEditText={setEditText}
                  onToggleComplete={() => toggleComplete(todo.id)}
                  onStartEditing={() => startEditing(todo.id, todo.text)}
                  onSaveEdit={saveEdit}
                  onDelete={() => deleteTask(todo.id)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default TodoList;
