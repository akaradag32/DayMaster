import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconCreate from '../assets/create.png';
import Button from '../components/Button';

const TaskForm = ({ isUpdate, task }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('priority');

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      description,
      date,
      time,
      priority,
      completed: false,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks${isUpdate ? `/${task.id}` : ''}`,
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
        //navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdate && task) {
      setDate(task.date);
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
          required
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
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
          <option value='high'>High</option>
          <option value='medium'>Medium</option>
          <option value='low'>Low</option>
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
      <Button
        type='submit'
        text={isUpdate ? 'UPDATE' : 'CREATE'}
        onClick={''}
        icon={<img src={iconCreate} alt='Icon' />}
      ></Button>
    </form>
  );
};

export default TaskForm;
