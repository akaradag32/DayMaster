import Navbar from '../components/Navbar';
import Button from '../components/Button';
import iconCreate from '../assets/create.png';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <p className='welcome-text'>
          We're thrilled to introduce you to your new, streamlined task
          management companion. Designed to help you conquer your to-do list and
          achieve your goals, our Task Manager is here to make your life more
          organized and productive.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', width:"300px" }}>
          <Button
            to='/createTask'
            text='CREATE'
            color="#00e1c0"
            icon={<img src={iconCreate} alt='Icon' />}
          ></Button>
          <Button
            to='/tasks'
            text='TASK BOARD'
            icon={<img src={iconCreate} alt='Icon' />}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
