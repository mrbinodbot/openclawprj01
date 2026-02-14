import React, { useEffect, useState, useRef } from 'react';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'todo-react.items';

export default function TodoApp() {
  const [items, setItems] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addTodo(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim()) return;
    const t: Todo = { id: Date.now().toString(), text: text.trim(), completed: false };
    setItems((s) => [t, ...s]);
    setText('');
    inputRef.current?.focus();
  }

  function toggle(id: string) {
    setItems((s) => s.map(it => it.id === id ? { ...it, completed: !it.completed } : it));
  }

  function remove(id: string) {
    setItems((s) => s.filter(it => it.id !== id));
  }

  function edit(id: string, newText: string) {
    setItems((s) => s.map(it => it.id === id ? { ...it, text: newText } : it));
  }

  const visible = items.filter(it =>
    filter === 'all' ? true : filter === 'active' ? !it.completed : it.completed
  );

  const remaining = items.filter(i => !i.completed).length;

  return (
    <div className="todo-app">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-300">Purple Todos</h1>
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm"
        >
          Toggle Theme
        </button>
      </div>

      <form onSubmit={addTodo} className="flex gap-3 mb-4">
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs doing?"
          className="input-base"
        />
        <button type="submit" className="action-btn">Add</button>
      </form>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-2">
          <button className={`filter-pill ${filter==='all'?'bg-primary-50 dark:bg-primary-700 text-primary-700 dark:text-white':'bg-transparent dark:bg-transparent'}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-pill ${filter==='active'?'bg-primary-50 dark:bg-primary-700 text-primary-700 dark:text-white':''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`filter-pill ${filter==='completed'?'bg-primary-50 dark:bg-primary-700 text-primary-700 dark:text-white':''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-300">{remaining} remaining</div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="text-6xl emoji-float">✨</div>
          <div className="mt-4">No tasks yet — add something fun to do!</div>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map(item => (
            <li key={item.id} className={`todo-item ${item.completed? 'completed':''} animate-bounceIn`}>
              <input type="checkbox" checked={item.completed} onChange={() => toggle(item.id)} className="w-5 h-5" />
              <EditableText value={item.text} onSave={(v) => edit(item.id, v)} />
              <div className="ml-auto flex gap-2">
                <button onClick={() => remove(item.id)} className="text-sm text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-300">{items.length} total</div>
        <div>
          <button onClick={() => setItems(items.filter(i=>!i.completed))} className="text-sm text-primary-600 dark:text-primary-300">Clear completed</button>
        </div>
      </div>
    </div>
  );
}

function EditableText({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  useEffect(() => setVal(value), [value]);

  function save() {
    if (val.trim() && val !== value) onSave(val.trim());
    setEditing(false);
  }

  if (!editing) return <div onDoubleClick={() => setEditing(true)} className="todo-text">{value}</div>;

  return (
    <input
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={save}
      onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
      autoFocus
      className="input-base"
    />
  );
}
