import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import iconRandom from '../assets/random.png';
import iconBoard from '../assets/board.png';
import iconDone from '../assets/done.png';
import Button from '../components/Button';

const TaskForm = ({ isUpdate, task }) => {
  const { date } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(date || '');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('priority');

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

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

      if (response.ok) {
        const currentTask = await response.json();
        navigate(`/tasks`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FIX ======== On Update It Redirects to Tasks Page?
  const handleRandom = async () => {
    const response = await fetch('https://www.boredapi.com/api/activity/');

    let currentDate = new Date().toJSON().slice(0, 10);
    let currentTime = new Date().toJSON().slice(11, 16);

    if (response.ok) {
      const randomTask = await response.json();

      setDueDate(dueDate || date || currentDate);
      setTime(time || currentTime);
      setPriority(priority !== 'priority' ? priority : 'High');
      setTitle(randomTask.type);
      setDescription(randomTask.activity);
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
          className='date-time'
          required
          type='date'
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
        <input
          className='date-time'
          required
          type='time'
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
        <select
          required
          value={priority}
          id='priority-select'
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          to='/tasks'
          type='button'
          text='TASK BOARD'
          icon={<img src={iconBoard} alt='Icon' />}
        ></Button>
        <Button
          onClick={handleRandom}
          type='button'
          text='RANDOM'
          color='#b3bbc9'
          icon={<img src={iconRandom} alt='Icon' />}
        ></Button>
        <Button
          type='submit'
          color='#00e1c0'
          text={isUpdate ? 'UPDATE' : 'CREATE'}
          icon={<img src={iconDone} alt='Icon' />}
        ></Button>
      </div>
    </form>
  );
};

export default TaskForm;
