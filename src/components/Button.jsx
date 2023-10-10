import { Link, useNavigate } from 'react-router-dom';

function Button({ icon, text, color, onClick, to, type }) {
  const navigate = useNavigate();
  const buttonStyle = {
    backgroundColor: color,
  };

  if (onClick) {
    // If onClick is provided, use a regular button with an onClick event.
    return (
      <button className='button' style={buttonStyle} onClick={onClick}>
        {icon && <span className='button-icon'>{icon}</span>}
        {text}
      </button>
    );
  } else if (type) {
    // If type is provided, use a regular button with an form submit event.
    return (
      <button type='submit' className='button' style={buttonStyle}>
        {icon && <span className='button-icon'>{icon}</span>}
        {text}
      </button>
    );
  }
  // If to is provided, use the Link component to create a route link.
  return (
    <Link
      to={to}
      type='submit'
      className='button button-link'
      style={buttonStyle}
    >
      {icon && <span className='button-icon'>{icon}</span>}
      {text}
    </Link>
  );
}

export default Button;
