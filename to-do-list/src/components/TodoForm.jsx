function TodoForm ({text, onChangeText, onSubmit}) {
    function handleKeyDown(e) {
        if (e.key === "Enter") onSubmit();
    }

    return (
        <section className="space-y-3">
            <div className="flex gap-2">
                <input
                type="text"
                value={text}
                placeholder="Write a task..."
                onChange={(e) => onChangeText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                />
                <button
                onClick={onSubmit}
                className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 active:scale-[0.98] transition"
                >
                Add
                </button>
            </div>
        </section>
    );
}

export default TodoForm;