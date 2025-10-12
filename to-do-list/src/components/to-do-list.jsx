import { useState } from "react";

function createInitialTodos() {
  return [];
}

function TodoList() {
    const [todos, setTodos] = useState(createInitialTodos);
    const [text, setText] = useState("");

    function addTask() {
      if (text.trim() === "") {
        return;
      }

      const newTask = {
        id: Date.now(),
        text: text,
        completed: false
      };

      const newList = [newTask, ...todos];

      setTodos(newList);

      setText("");
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
                  {item.text}
                  </li>
              ))}
            </ul>
          </>
        );
    }


export default TodoList;