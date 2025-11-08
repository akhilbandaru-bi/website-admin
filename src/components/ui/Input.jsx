import React from 'react';
import { Squircle } from '@squircle-js/react';
import './Input.css';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  id,
  required = false,
  className = ''
}) => {
  return (
    <Squircle
      cornerRadius={12}
      cornerSmoothing={1}
      className={`squircle-input-wrapper ${className}`}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        required={required}
        className="squircle-input"
      />
    </Squircle>
  );
};

export default Input;
