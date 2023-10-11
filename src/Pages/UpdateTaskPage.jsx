import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import { useParams } from 'react-router-dom';

function UpdateTaskPage() {
  const { taskId } = useParams();

  const [task, setTask] = useState();

  // Loader
  useEffect(() => {
    const loader= document.getElementById('loader');
    
    if (loader) {
      loader.classList.add('loading-spinner');
    }
  
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`
      );
  
      if (response.ok) {
        const task = await response.json();
        setTask(task);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    // Remove loader
      const loader = document.getElementById('loader');
      const loadingContainer = document.getElementById('loading-container');
        if (loader && loadingContainer) {
          loader.classList.remove('loading-spinner');
          loadingContainer.remove();
        }
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  // keep the empty div or navbar will brake when loader is removed
  return (
    <>
      <Navbar />
      <div>
        <div id="loading-container">
          <div id="loader"></div>
        </div>
        <TaskForm isUpdate task={task} />
      </div>
    </>
  );
}

export default UpdateTaskPage;
