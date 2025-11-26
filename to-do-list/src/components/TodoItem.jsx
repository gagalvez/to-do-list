function TodoItem({
  todo,
  isEditing,
  editText,
  onChangeEditText,
  onToggleComplete,
  onStartEditing,
  onSaveEdit,
  onDelete,
}) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm hover:border-sky-500/60 hover:bg-slate-900 transition">
      <button
        onClick={onToggleComplete}
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          todo.completed
            ? "border-emerald-400 bg-emerald-500/30"
            : "border-slate-500 group-hover:border-sky-400"
        }`}
      >
        {todo.completed ? "✓" : ""}
      </button>

      <div className="flex-1">
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => onChangeEditText(e.target.value)}
            className="w-full bg-slate-900/70 border border-slate-600 rounded-lg px-2 py-1 text-sm outline-none focus:border-sky-500"
          />
        ) : (
          <p
            className={
              todo.completed
                ? "text-slate-400 line-through opacity-70"
                : "text-slate-100"
            }
          >
            {todo.text}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={onSaveEdit}
          className="text-xs text-emerald-400 hover:text-emerald-300"
        >
          Save
        </button>
      ) : (
        <button
          onClick={onStartEditing}
          className="text-xs text-slate-400 hover:text-sky-400"
        >
          Edit
        </button>
      )}

      <button
        onClick={onDelete}
        className="text-xs text-slate-500 hover:text-red-400"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
