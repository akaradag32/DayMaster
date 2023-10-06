import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

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

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    console.log(task);
  }, [task]);

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
              <div key={currentDay}>
                {currentDay}
                <br />
                {currentDayName}
                <div>
                  {task.map((task) => {
                    if (task.dueDate == `${currentMonth}/${currentDay}/${currentYear}`) {
                      return <Button key={task.id} />;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={goToPreviousWeek}>Left</button>
        <button onClick={goToNextWeek}>Right</button>
      </div>
    </div>
  );
}

export default DisplayTasksPage;




