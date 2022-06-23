import '../App.css';
import { useState ,useEffect } from "react"
import FirebaseApi from '../api/FirebaseApi'; 


function Task() {
  const [tasks, setTask] = useState([]);
  const [form, setForm] = useState({ note: "", completed: false });

  const loadTask = async () => {
      const todo = await FirebaseApi.readData();
      setTask(todo);
  };

  useEffect(() => {
      loadTask();
  }, []);

  const addTask = (e) => {
      e.preventDefault();
      if (form.note.length <= 0) {
          return;
      }

      FirebaseApi.addData(form).then((resp) => {
          setTask([resp, ...tasks]);
          setForm({ note: "", completed: false });
      });
  };
  const handleCompleted = async (item) => {
    await FirebaseApi.updateData({ ...item, completed: !item.completed });
    await loadTask();
};  
  const removeTask = async (item_idx) => {
      await FirebaseApi.deleteData(item_idx);
      await loadTask();

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

};

export default Task; 