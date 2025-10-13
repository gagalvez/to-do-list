import { useState } from "react";

function createInitialTodos() {
  return [];
}

function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

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
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  }

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Write a new task"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <button onClick={() => setTodos([])}>Reset</button>

      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {item.text}
                <button onClick={() => startEditing(item.id, item.text)}>
                  Edit
                </button>
                <button onClick={() => deleteTask(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

