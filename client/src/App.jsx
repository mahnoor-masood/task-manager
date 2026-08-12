import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="app">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <div className="wrapper">
        <header className="header">
          <div className="header-icon">✓</div>
          <div>
            <h1>TaskFlow</h1>
            <p className="subtitle">Organize your day, achieve your goals</p>
          </div>
        </header>

        <div className="main-grid">
          <div className="left-panel">
            <div className="card form-card">
              <h2 className="card-title">Add New Task</h2>
              <form onSubmit={addTask} className="task-form">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-title"
                />
                <textarea
                  placeholder="Add details (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-desc"
                  rows="3"
                />
                <button type="submit" className="btn-add">
                  <span>+</span> Add Task
                </button>
              </form>
            </div>

            <div className="card stats-card">
              <h2 className="card-title">Progress</h2>
              <div className="progress-ring-wrap">
                <svg className="progress-ring" width="120" height="120">
                  <circle cx="60" cy="60" r="50" className="ring-bg" />
                  <circle
                    cx="60" cy="60" r="50"
                    className="ring-fill"
                    style={{
                      strokeDasharray: 314,
                      strokeDashoffset: 314 - (314 * progress) / 100,
                    }}
                  />
                </svg>
                <div className="progress-label">{progress}%</div>
              </div>
              <div className="stat-row">
                <div className="stat-box">
                  <span className="stat-num">{tasks.length}</span>
                  <span className="stat-name">Total</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">{completedCount}</span>
                  <span className="stat-name">Done</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num">{tasks.length - completedCount}</span>
                  <span className="stat-name">Left</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card list-card">
            <div className="filter-tabs">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  className={`tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <ul className="task-list">
              {loading && <p className="empty-state">Loading tasks...</p>}
              {!loading && filteredTasks.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <p>No tasks here yet</p>
                </div>
              )}
              {filteredTasks.map((task, i) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="task-left">
                    <button
                      className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
                      onClick={() => toggleComplete(task)}
                    >
                      {task.completed && '✓'}
                    </button>
                    <div className="task-text">
                      <span className="task-title">{task.title}</span>
                      {task.description && <span className="task-desc">{task.description}</span>}
                    </div>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="btn-delete">
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;