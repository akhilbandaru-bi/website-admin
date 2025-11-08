import React from 'react';
import './Toggle.css';

const Toggle = ({
  id,
  name,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  onLabel = 'On',
  offLabel = 'Off',
}) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label
      htmlFor={id}
      className={`app-toggle ${disabled ? 'disabled' : ''} ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="app-toggle-input"
      />
      <span className="app-toggle-track">
        <span className="app-toggle-thumb" />
      </span>
      {(onLabel || offLabel) && (
        <span className="app-toggle-status">{checked ? onLabel : offLabel}</span>
      )}
    </label>
  );
};

export default Toggle;

