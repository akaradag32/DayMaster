import { Link } from 'react-router-dom';

function Button({ icon, text, color, onClick, to, type }) {
  const buttonStyle = {
    backgroundColor: color,
  };

  if (onClick) {
    debugger;
    // If onClick is provided, use a regular button with an onClick event.
    return (
      <button
        type={type}
        className='button'
        style={buttonStyle}
        onClick={onClick}
      >
        {icon && <span className='button-icon'>{icon}</span>}
        {text}
      </button>
    );
  } else if (type === 'submit') {
    debugger;
    // If type is provided, use a regular button with an form submit event.
    return (
      <button type={type} className='button' style={buttonStyle}>
        {icon && <span className='button-icon'>{icon}</span>}
        {text}
      </button>
    );
  }
  debugger;
  // If to is provided, use the Link component to create a route link.
  return (
    <Link
      type={type}
      to={to}
      className='button button-link'
      style={buttonStyle}
    >
      {icon && <span className='button-icon'>{icon}</span>}
      {text}
    </Link>
  );
}

export default Button;
