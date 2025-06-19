import { useState } from "react";
import { useEffect } from "react";
import "./Todo.css";
import {FaArrowAltCircleUp,FaArrowAltCircleDown,FaTrash} from "react-icons/fa";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("todo_tasks");
    const parsed = storedTasks ? JSON.parse(storedTasks) : [];
    return parsed.length > 0 ? parsed : [
      { text: "Wake up by 6:30 AM", completed: false },
      { text: "Go to gym for 1 hour", completed: false },    
      { text: "Take a cold shower", completed: false },
      { text: "Take high protien Breakfast", completed: false },
      ];
  });
  
  const [newTasks, setNewTasks] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addBtn() {
    if (newTasks.trim() !== "") {
      setTasks((t) => [...t, { text: newTasks, completed: false }]);
      setNewTasks("");
    } else {
      alert("Inputs Cannot be Empty");
    }
  }

  function toggleCompleted(index) {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  }

  function deleteButton(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleInputChange(e) {
    setNewTasks(e.target.value);
  }

  function moveUp(index) {
    if (index > 0) {
      const array = [...tasks];
      [array[index], array[index - 1]] = [array[index - 1], array[index]];
      setTasks(array);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const array = [...tasks];
      [array[index], array[index + 1]] = [array[index + 1], array[index]];
      setTasks(array);
    }
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="inp-add">
        <input
          type="text"
          value={newTasks}
          onChange={handleInputChange}
          placeholder="Enter your task..."/>

        <button onClick={addBtn}>Add Task</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <div className="listandBut">
        <ul>
          {tasks
            .filter((task) => {
              if (filter === "all") return true;
              else if (filter === "completed") return task.completed;
              else if (filter === "pending") return !task.completed;
              return true;
            })

            .map((task, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(index)} />
                
                <span className={`text ${task.completed ? "completed" : ""}`}>
                  {task.text}
                </span>

                <div className="icons">
                  
                  <button className="delbtn" onClick={() => deleteButton(index)}>
                    <FaTrash />
                  </button>
                  
                  <button className="upbtn" onClick={() => moveUp(index)}>
                    <FaArrowAltCircleUp />
                  </button>
                  
                  <button className="downbtn" onClick={() => moveDown(index)}>
                    <FaArrowAltCircleDown />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Todo; 