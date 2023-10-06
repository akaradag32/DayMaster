import React, { useState } from 'react';
import Navbar from '../components/Navbar';

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

  return (
    <div>
      <Navbar/>
      <div>
        {currentMonthName}
        <button onClick={goToPreviousWeek}>Left</button>
        <button onClick={goToNextWeek}>Right</button>
      </div>
      {daysOfWeek.map((day, index) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + index);

        const currentDay = date.getDate();
        const currentDayName = day

        return (
          <div key={currentDay}>
            {currentDay}
            <br />
            {currentDayName}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayTasksPage;




