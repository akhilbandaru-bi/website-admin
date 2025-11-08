import React from 'react';
import './Dropdown.css';

const normalizeOptions = (options) =>
  options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  );

const Dropdown = ({
  id,
  name,
  value = '',
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  allowEmpty = false,
}) => {
  const normalizedOptions = normalizeOptions(options);

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={`app-dropdown-wrapper ${disabled ? 'disabled' : ''}`}>
      <select
        id={id}
        name={name}
        value={value ?? ''}
        onChange={handleChange}
        disabled={disabled}
        className={`app-dropdown ${className}`}
        aria-disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled={!allowEmpty}>
            {placeholder}
          </option>
        )}
        {normalizedOptions.map(({ value: optionValue, label }) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

