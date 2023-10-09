import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
function Navbar() {
    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="logo" className = "logo" />
            </Link>
        </nav>
    )
}

export default Navbar;
