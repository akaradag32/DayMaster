import { Link } from "react-router-dom";
import iconCreate from '../assets/create-big.png';

function AddTaskButton(date) {

    return (
        <Link to="/createTask" className="add-task-button">
            <img src={iconCreate} alt="Icon" />
        </Link>
    );
}

export default AddTaskButton;