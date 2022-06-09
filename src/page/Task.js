
import '../App.css';
import { useState } from "react"

function Task() {
  const [tasks, setTask] = useState([]);
  const [form, setForm] = useState({ note: "", complete: false });
  const addTask = (e) => {
    e.preventDefault();
    if (form.note.length <= 0) {
      return;
    }

    setTask([form, ...tasks]);
    setForm({ note: "", complete: false })
  };
  return (
    <div className="container">
      <h1 className="header">My Todo List</h1>
      <hr />
      <form className="form" onSubmit={addTask}>
        <input type="type" className="input" placeholder="Create new task" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <button type="submit" className="button">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.map((item) => (
          <li className="task-item">
            <input type="checkbox" className="task-checked" />
            {item.note}
          </li>

        ))}</ul>

    </div>
  );
}

export default Task;