
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
  const handleCompleted = (item_idx) => {
    const updatedTask = tasks.map((task, idx) => {
      if (idx === item_idx) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTask(updatedTask);
  };
  const removeTask = (item_idx) => {
    const updatedTask = tasks.filter((task, idx) => idx !== item_idx);
    setTask(updatedTask);
  };
  const renderTaskItem = (item, index) => {
    return (
      <li key={index} className="task-item">
        <div style={{ flex: 1 }} onClick={(event) => handleCompleted(index)}>
          <input type="checkbox" checked={item.completed} />
          <span className={item.completed ? "task-completed" : ""}>{item.note}</span>
        </div>
        <button className="task-item-remove" onClick={(event) => removeTask(index)}>
          Del
        </button>
      </li>
    );
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
        {tasks.map(renderTaskItem)}</ul>
    </div>
  );

}

export default Task;