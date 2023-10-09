import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DisplayTasksPage from './Pages/DisplayTasksPage';
import CreateTaskPage from './Pages/CreateTaskPage';
import UpdateTaskPage from './Pages/UpdateTaskPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tasks' element={<DisplayTasksPage />} />
        <Route path='/createTask' element={<CreateTaskPage />} />
        <Route path='/updateTask/:taskId' element={<UpdateTaskPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
