import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tasks' element={<feDisplayTasksPage />} />
        <Route path='/createTask/' element={<CreateTaskPage />} />
        <Route path='/tasks/:taskId/update' element={<UpdateProjectPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
