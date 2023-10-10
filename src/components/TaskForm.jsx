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
        navigate(`/tasks`);
      }
    } catch (error) {
      console.log(error);
    }
  };

// priority color change

  useEffect(() => {
    const selectElement = document.getElementById('priority-select');
    
    const handleSelectChange = (event) => {
      const selectedOption = event.target.value;
      
      const colors = {
        High: '#ff7984',
        Medium: '#ffb600',
        Low: '#00e1c0',
      };
  
      selectElement.style.backgroundColor = colors[selectedOption];
    };
  
    handleSelectChange({ target: { value: priority } });

    selectElement.addEventListener('change', handleSelectChange);

  }, [priority]);

/////////////////////////  

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
          id="priority-select"
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
      <Button
        type='submit'
        text={isUpdate ? 'UPDATE' : 'CREATE'}
        icon={<img src={iconCreate} alt='Icon' />}
      ></Button>
    </form>
  );
};

export default TaskForm;
