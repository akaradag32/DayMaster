import React, { useState, useEffect } from 'react';
import Button from "./Button";
import iconCreate from '../assets/create.png';

const Task = ({ id, title, time, description, priority, completed, onTaskDeleted, onTaskCompleted }) => {
    const [isUnfolded, setIsUnfolded] = useState(false);

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

    const handleTaskDelete = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${id}`, 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
      
            if (response.ok) {
                onTaskDeleted(id);
            } 
        } 
        catch (error) {
          console.error('Fetch error:', error);
        }
    };
    
    const markAsComplete = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${id}`, 
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ completed: true }),
                }
                );
                
                if (response.ok) {
                    onTaskCompleted(id);
                }
            } 
                catch (error) {
                    console.error('Fetch error:', error);
                }
    };

    return (
      <div className = {`task-box`} onClick={toggleUnfold} style={{backgroundColor:setPriorityColor()}}>
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
            onClick={markAsComplete}
            text="DONE"
            icon={<img src={iconCreate} alt="Icon" />}
            color="#00e1c0"
            />
            <div className="space"></div>
            <Button
            onClick={handleTaskDelete}
            text="DELETE"
            icon={<img src={iconCreate} alt="Icon" />}
            color="#ff7984"
            />
        </div>
      </div>
    );
  };
  
  export default Task;