import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconCreate from '../assets/create.png';
import Button from '../components/Button';

const TaskForm = ({ isUpdate, task }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('priority');

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      description,
      dueDate,
      time,
      priority,
      completed: false,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks${
          isUpdate ? `/${task.id}/update` : ''
        }`,
        {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const currentTask = await response.json();
        console.log(currentTask);
        navigate(`/tasks`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}/update`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        navigate('/tasks');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdate && task) {
      setDueDate(task.dueDate);
      setTime(task.time);
      setPriority(task.priority);
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  return (
    <form id='task-form' onSubmit={onSubmit}>
      <div className='top-bar'>
        <input
          className="date-time"
          required
          type='date'
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <input
          className="date-time"
          required
          type='time'
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
        <select
          required
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
          }}
        >
          <option disabled value='priority'>
            Priority
          </option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
      </div>
      <label className='title'>
        <input
          placeholder='Title...'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>
      <label>
        <textarea
          placeholder='Description...'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </label>
      {isUpdate && (
        <Button
          onClick={onDelete}
          text='DELETE'
          //Fix DELETE BUTTON
          icon={<img src={iconCreate} alt='Icon' />}
        ></Button>
      )}
      <Button
        type='submit'
        text={isUpdate ? 'UPDATE' : 'CREATE'}
        icon={<img src={iconCreate} alt='Icon' />}
      ></Button>
    </form>
  );
};

export default TaskForm;
