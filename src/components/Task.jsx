import React, { useState } from 'react';
import Button from "./Button";
import iconCreate from '../assets/create.png';

const Task = ({ id, title, time, description, priority }) => {
    const [isUnfolded, setIsUnfolded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const setPriorityColor = () => {
      switch (priority) {
        case 'High':
          return "#ffe9e8";
        case 'Medium':
          return '#ffe6ae';
        case 'Low':
          return '#e3fff6';
        default:
          return 'bblue';
      }
    };

    const toggleUnfold = () => {
        setIsUnfolded(!isUnfolded);
    };

    const [tasks, setTasks] = useState([]);
    

    const handleTaskDelete = (taskId) => {      
        fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          method: 'DELETE', // Use the DELETE HTTP method
          headers: {
            'Content-Type': 'application/json', // Adjust the content type as needed
            // You may need to include any authentication headers here
          },
        })
          .then((response) => {
            if (response.ok) {
              // Task was successfully deleted
              // You can update your local state to remove the task with taskId
              // For example, you can filter out the deleted task from your tasks array
              setTasks(tasks.filter((task) => task.id !== taskId));
              setIsDeleted(true)
            } else {
              // Handle any errors here
              console.error('Error deleting task');
            }
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
      };
  
    return (
      <div className = {`task-box ${isDeleted? 'hidden' : 'visible'}`} onClick={toggleUnfold} style={{backgroundColor:setPriorityColor()}}>
        <p className = "task-title">{title}</p>
        <p className = "task-time">{time}</p>
        <div className = {`unfold ${isUnfolded ? 'visible' : 'hidden'}`}>
            <p className = "task-description">{description}</p>
            <Button
            to={`/tasks/${id}/update`}
            text="EDIT"
            icon={<img src={iconCreate} alt="Icon" />}
            />
            <div className="space"></div>
            <Button
            onClick={handleTaskDelete}
            text="DELETE"
            icon={<img src={iconCreate} alt="Icon" />}
            color="#ff7984"
            />
            <div className="space"></div>
            <Button
            to={`/tasks/${id}/update`}
            text="DONE"
            icon={<img src={iconCreate} alt="Icon" />}
            color="#00e1c0"
            />
        </div>
      </div>
    );
  };
  
  export default Task;