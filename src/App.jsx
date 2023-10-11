import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DisplayTasksPage from './Pages/DisplayTasksPage';
import CreateTaskPage from './Pages/CreateTaskPage';
import UpdateProjectPage from './Pages/UpdateTaskPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tasks' element={<DisplayTasksPage />} />
        <Route path='/createTask/:date' element={<CreateTaskPage />} />
        <Route path='/tasks/:taskId/update' element={<UpdateProjectPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
