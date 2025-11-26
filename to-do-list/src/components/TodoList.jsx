import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

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
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-700 shadow-xl shadow-sky-500/20 backdrop-blur-sm p-6 space-y-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              To-Do List
            </h1>
            <p className="text-sm text-slate-400">Organize your day</p>
          </div>
        </header>

        <section className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              placeholder="Escribe una tarea..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1 rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            />
            <button
              onClick={addTask}
              className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 active:scale-[0.98] transition"
            >
              Add
            </button>
          </div>
        </section>

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
