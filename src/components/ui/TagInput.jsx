import React, { useCallback, useMemo, useRef, useState } from 'react';
import './TagInput.css';

const TagInput = ({
  label,
  placeholder = 'Type and press Enter',
  values = [],
  onChange,
  id,
  name,
  disabled = false,
  maxTags,
  allowDuplicates = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const normalizedValues = useMemo(
    () => (Array.isArray(values) ? values.filter((tag) => tag !== undefined && tag !== null) : []),
    [values],
  );

  const emitChange = useCallback(
    (nextTags) => {
      if (onChange) {
        onChange(nextTags);
      }
    },
    [onChange],
  );

  const handleAddTag = useCallback(
    (rawValue) => {
      const trimmed = rawValue.trim();
      if (!trimmed) {
        return;
      }

      if (maxTags !== undefined && normalizedValues.length >= maxTags) {
        return;
      }

      if (!allowDuplicates) {
        const lowerTrimmed = trimmed.toLowerCase();
        const hasDuplicate = normalizedValues.some((tag) => tag.toLowerCase() === lowerTrimmed);
        if (hasDuplicate) {
          return;
        }
      }

      emitChange([...normalizedValues, trimmed]);
      setInputValue('');
    },
    [allowDuplicates, emitChange, maxTags, normalizedValues],
  );

  const handleRemoveTag = useCallback(
    (index) => {
      const next = normalizedValues.filter((_, idx) => idx !== index);
      emitChange(next);
    },
    [emitChange, normalizedValues],
  );

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (disabled) {
        return;
      }

      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        if (inputValue) {
          handleAddTag(inputValue);
        }
        return;
      }

      if (event.key === 'Backspace' && !inputValue && normalizedValues.length) {
        event.preventDefault();
        handleRemoveTag(normalizedValues.length - 1);
      }
    },
    [disabled, handleAddTag, handleRemoveTag, inputValue, normalizedValues.length],
  );

  const handlePaste = useCallback(
    (event) => {
      if (disabled) {
        return;
      }
      const pasteData = event.clipboardData.getData('text');
      if (pasteData) {
        const candidates = pasteData.split(/[,;\n\t]/);
        const cleaned = candidates
          .map((item) => item.trim())
          .filter(Boolean)
          .filter((tag) => (allowDuplicates ? true : !normalizedValues.includes(tag)));

        if (!cleaned.length) {
          return;
        }

        event.preventDefault();
        const combined = [...normalizedValues];
        cleaned.forEach((tag) => {
          if (maxTags !== undefined && combined.length >= maxTags) {
            return;
          }
          if (!allowDuplicates) {
            const isDuplicate = combined.some(
              (existing) => existing.toLowerCase() === tag.toLowerCase(),
            );
            if (isDuplicate) {
              return;
            }
          }
          combined.push(tag);
        });
        emitChange(combined);
      }
    },
    [allowDuplicates, disabled, emitChange, maxTags, normalizedValues],
  );

  return (
    <div className={`tag-input ${disabled ? 'disabled' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="tag-input-label">
          {label}
        </label>
      )}
      <div
        className={`tag-input-container ${normalizedValues.length ? 'has-tags' : ''} ${
          disabled ? 'is-disabled' : ''
        }`}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus();
          }
        }}
      >
        <div className="tag-input-tags">
          {normalizedValues.map((tag, index) => (
            <span className="tag-input-chip" key={`${tag}-${index}`}>
              <span className="tag-input-chip-text">{tag}</span>
              {!disabled && (
                <button
                  type="button"
                  className="tag-input-chip-remove"
                  onClick={() => handleRemoveTag(index)}
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        <input
          ref={inputRef}
          id={id}
          name={name}
          className="tag-input-field"
          placeholder={normalizedValues.length ? '' : placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={disabled || (maxTags !== undefined && normalizedValues.length >= maxTags)}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default TagInput;

