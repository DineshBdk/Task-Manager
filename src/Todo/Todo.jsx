import { useState } from "react";
import './Todo.css'
import { FaArrowAltCircleUp,FaArrowAltCircleDown,FaTrash } from "react-icons/fa";

const Todo = () => {
  const [tasks, setTasks] = useState(["Go to Gym","Eat high protein","Jog in Evening"])
  const [newTasks,setNewTasks]=useState("")
  
  function addBtn() {
    if (newTasks.trim()!=="") {
      setTasks(t => [...t, newTasks])
      setNewTasks("")
    }
    else {
      alert("Inputs Cannot be Empty")
    }
  }

  function deleteButton(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleInputChange(e) {
    setNewTasks(e.target.value)
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
      
      <div className="inpadd">
        
        <input type="text" value={newTasks}
          onChange={handleInputChange}
          placeholder="Enter your task..." />
        
        <button
          onClick={addBtn}>Add Task</button>
       </div>
      
      <div className="listandBut">
      <ul>
        {tasks.map((task, index) =>
          <li key={index}>
            <span className="text">{task}</span>
            
            <button className="delbtn"
              onClick={() => deleteButton(index)}>
              <FaTrash/>
            </button>
            
            <button className="upbtn"
              onClick={() => moveUp(index)}>
                <FaArrowAltCircleUp/>
            </button>
            
            <button className="downbtn"
              onClick={() => moveDown(index)}>
              <FaArrowAltCircleDown/>
            </button>
          </li>)}
      </ul>
    </div>
</div>
  )
};
export default Todo;