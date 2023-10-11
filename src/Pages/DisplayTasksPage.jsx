import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Task from '../components/Task'
import AddTaskButton from '../components/AddTaskButton';

function DisplayTasksPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const date = new Date(currentDate);
  const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  
  const setToMonday = (date) => {
    if (date.getDay() !== 1) {
      date.setDate(date.getDate() - (date.getDay() - 1)); 
    }
    // console.log(date.getDay())
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  setToMonday(currentDate); 

  const [task, setTask] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);

      if (response.ok) {
        const allTask = await response.json();
        setTask(allTask);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTaskDeleted = (taskId) => {
    setTask((tasks) => tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskCompleted = (taskId) => {
    setTask((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { completed: true } : task
      )
    );
  };

  useEffect(() => {
    fetchTask();
  }, []);

  // useEffect(() => {
  // }, [task]);

  const sortedTasks = [...task].sort((a, b) => (a.time ? a.time.localeCompare(b.time) : 0));

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <div>
          <p className='month'>
            {currentMonthName.toUpperCase()}
          </p>
        </div>
        <div className='task-manager-container'>
          {daysOfWeek.map((day, index) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + index);

            const currentDay = date.getDate();
            const currentDayName = day
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth() + 1;

            return (
                <div className='day-wrapper' key={currentDay}>
                  <p className="day-date">{currentDay}</p>
                  <p className="day-date">{currentDayName}</p>
                  <div className='task-wrapper task-wrapper-scrollable'>
                      {sortedTasks.map((task) => {
                        if (task.dueDate == `${currentYear}-${currentMonth}-${currentDay < 10 ? '0' + currentDay : currentDay}` && task.completed === false) {
                          return (
                          <Task 
                          key={task.id} 
                          id={task.id}
                          title={task.title} 
                          time={task.time} 
                          description={task.description} 
                          priority={task.priority}
                          completed={task.completed}
                          onTaskDeleted={handleTaskDeleted}
                          onTaskCompleted={handleTaskCompleted}
                          />)
                        }
                      })}
                  <AddTaskButton date={task.dueDate}/>
                  </div>
                </div>
            );
          })}
        </div>
        <div className="nav-button-wrapper">
          <button className="nav-button" onClick={goToPreviousWeek}>Left</button>
          <button className="nav-button" onClick={goToNextWeek}>Right</button>
        </div>
      </div>
    </div>
  );
}

export default DisplayTasksPage;




