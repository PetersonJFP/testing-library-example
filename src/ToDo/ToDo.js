import React, { useState } from "react";
import uniqid from "uniqid";

const ToDo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = evt => {
    evt.preventDefault();
    setTasks([...tasks, { id: uniqid(), name: task }]);
    setTask("");
  };

  const removeTask = t => () => {
    setTasks(tasks.filter(item => item.id !== t.id));
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          data-testid="new-task"
          onChange={ev => setTask(ev.target.value)}
        />
        <button type="submit" data-testid="add-task" disabled={!task.length}>
          Add Task
        </button>
      </form>
      <ul>
        <ToDoList tasks={tasks} removeTask={removeTask} />
      </ul>
    </div>
  );
};

const ToDoList = ({ tasks, removeTask }) => {
  return tasks.map(t => (
    <li key={t.id}>
      {t.name}{" "}
      <button onClick={removeTask(t)} data-testid={`remove-task-${t.name}`}>
        X
      </button>
    </li>
  ));
};

export default ToDo;
