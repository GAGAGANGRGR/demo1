
import React, { useState} from "react";
import { format, startOfWeek, addDays } from "date-fns";
import "./App.css";

const TaskContainer = ({ tasks, handleDelete }) => {
  return (
    <div className="task-container">
      {tasks.map((task) => (
        <div key={task.id}
        
        style={{ width: '24%', display: 'flex', justifyContent: 'space-evenly', border: '1px solid', padding: '10px', alignItems: 'left', margin: '6px' }}
        
        className="task">

         <strong>{task.title}</strong> 
        {task.description} 
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        
        </div>
      ))}
    </div>
  );
};

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSave = () => {
    if (title && description && selectedDate) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        date: selectedDate,
      };

      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDelete = (taskId) => 
  {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const renderDayPicker = () => {
 
    const startOfCurrentWeek = startOfWeek(selectedDate);
   const tasksForSelectedDate = tasks.filter(
      (task) =>
        format(new Date(task.date), "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
    );

    return (
      <div className="day-picker">
        <div className="day-buttons-container">
          {Array.from({ length: 7}).map((_, i) => {
            const day = addDays(startOfCurrentWeek, i);
            return (
              
              <button
                key={i}
                onClick={() => handleDateChange(day)}
                className={
                  format(day, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd")
                    ? "selected-day-button"
                    : ""
                }
              >
                {format(day, "EEEE")}
              </button>
            );
          })}
        </div>


        <div 
            className="selected-day-container">
          <TaskContainer
            tasks={tasksForSelectedDate}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    );
  };  

  return (
    <div>
      
      <div style={{width: '24%',
  height: '60px',
  border: '1px solid black',
  padding: '10px',
  margin: '10px',
  borderRadius: '8px',}}>
        
        <input 
          placeholder='Title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  /> 
          
        <input 
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        /> <br></br>


        <input 
          placeholder='Description'
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <button  onClick={handleSave}>Save</button>
      </div>
      {renderDayPicker()}
    </div>
  );
}

export default App;
