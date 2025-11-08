import React from 'react';
import { Squircle } from '@squircle-js/react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  return (
    <Squircle
      cornerRadius={12}
      cornerSmoothing={1}
      className={`squircle-button ${variant} ${fullWidth ? 'full-width' : ''} ${className} ${disabled ? 'disabled' : ''}`}
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="squircle-button-inner"
      >
        {children}
      </button>
    </Squircle>
  );
};

export default Button;
