import React, { useEffect, useState, useRef } from 'react';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'todo-react.items';

// Icon Components
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4.293 1.293a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L14.293 4.707a1 1 0 010-1.414zm2.414 4.414a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM2.707 2.707a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L2.707 4.121a1 1 0 010-1.414zm12.707 12.586a1 1 0 11-1.414 1.414l1.414-1.414zM10 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-4.293-1.293a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM2 10a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export default function TodoApp() {
  const [items, setItems] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isDark, setIsDark] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

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
  const completed = items.filter(i => i.completed).length;

  return (
    <div className="todo-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <div>
            <h1 className="app-title">Tasks</h1>
            <p className="app-subtitle">Stay organized and on track</p>
          </div>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={addTodo} className="input-section">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
            spellCheck="false"
          />
          <button type="submit" className="add-button" aria-label="Add task">
            <PlusIcon />
          </button>
        </div>
      </form>

      {/* Filter Tabs */}
      <div className="filter-section">
        <div className="filter-tabs">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
            >
              <span className="capitalize">{f}</span>
              {f === 'all' && <span className="filter-badge">{items.length}</span>}
              {f === 'active' && <span className="filter-badge">{remaining}</span>}
              {f === 'completed' && <span className="filter-badge">{completed}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Todo List or Empty State */}
      <div className="todo-list-section">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No tasks yet</h3>
            <p className="empty-message">Create your first task to get started</p>
          </div>
        ) : (
          <>
            {visible.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✨</div>
                <h3 className="empty-title">All done!</h3>
                <p className="empty-message">No {filter} tasks at the moment</p>
              </div>
            ) : (
              <ul className="todo-list">
                {visible.map((item, index) => (
                  <li
                    key={item.id}
                    className="todo-item"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      className={`checkbox ${item.completed ? 'checked' : ''}`}
                      aria-label="Toggle task"
                    >
                      {item.completed && <CheckIcon />}
                    </button>
                    <EditableText
                      value={item.text}
                      completed={item.completed}
                      onSave={(v) => edit(item.id, v)}
                    />
                    <button
                      onClick={() => remove(item.id)}
                      className="delete-button"
                      aria-label="Delete task"
                    >
                      <TrashIcon />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Footer Stats */}
      {items.length > 0 && (
        <div className="footer-section">
          <div className="stats">
            <div className="stat">
              <span className="stat-label">Total</span>
              <span className="stat-value">{items.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Active</span>
              <span className="stat-value">{remaining}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Done</span>
              <span className="stat-value">{completed}</span>
            </div>
          </div>
          {completed > 0 && (
            <button
              onClick={() => setItems(items.filter(i => !i.completed))}
              className="clear-button"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function EditableText({ value, completed, onSave }: { value: string; completed: boolean; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setVal(value), [value]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function save() {
    if (val.trim() && val !== value) onSave(val.trim());
    setEditing(false);
  }

  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className={`task-text ${completed ? 'completed' : ''}`}
        role="button"
        tabIndex={0}
      >
        {value}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={save}
      onKeyDown={e => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') setEditing(false);
      }}
      className="task-edit-input"
      spellCheck="false"
    />
  );
}
