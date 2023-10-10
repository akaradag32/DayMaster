import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import { useParams } from 'react-router-dom';

function UpdateTaskPage() {
  const { taskId } = useParams();

  const [task, setTask] = useState();

  const fetchTask = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${taskId}`
    );

    if (response.ok) {
      const task = await response.json();
      setTask(task);
      console.log(task);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <>
      <Navbar />

      <TaskForm isUpdate task={task} />
    </>
  );
}

export default UpdateTaskPage;
