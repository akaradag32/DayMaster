import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconCreate from '../assets/create.png';
import Button from '../components/Button';

const TaskForm = ({ isUpdate, project }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const payload = { title, description };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks${
          isUpdate ? `/${project.id}` : ''
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
        const currentProject = await response.json();
        console.log(currentProject);
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdate && project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  return (
    <form id='task-form' onSubmit={onSubmit}>
      <div className='top-bar'>
        <input type='date' />
        <input type='time' />
        <select defaultValue='priority'>
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>
      <label>
        <textarea
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
