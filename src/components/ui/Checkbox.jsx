import React from 'react';
import { Squircle } from '@squircle-js/react';
import './Checkbox.css';

const Checkbox = ({ 
  checked, 
  onChange, 
  label, 
  name,
  id,
  className = ''
}) => {
  return (
    <label className={`squircle-checkbox-label ${className}`} htmlFor={id}>
      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        className={`squircle-checkbox-wrapper ${checked ? 'checked' : ''}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
          id={id}
          className="squircle-checkbox-input"
        />
        {checked && (
          <svg
            className="squircle-checkbox-checkmark"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8L6 11L13 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Squircle>
      {label && <span className="squircle-checkbox-label-text">{label}</span>}
    </label>
  );
};

export default Checkbox;
