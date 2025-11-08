import React, { useState, useRef, useEffect } from 'react';
import { Squircle } from '@squircle-js/react';
import './Table.css';

const Table = ({ 
  data = [], 
  columns = [], 
  selectable = false, 
  onSelectionChange = () => {},
  onRowClick = () => {},
  onEdit = () => {},
  onDelete = () => {},
  className = ''
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(null); // Track which row's modal is open
  const modalRef = useRef(null);

  const selectedCount = selectedIds.size;
  const totalCount = data.length;
  const allSelected = totalCount > 0 && selectedCount === totalCount;

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      onSelectionChange(Array.from(next));
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(prev => {
      if (allSelected) {
        onSelectionChange([]);
        return new Set();
      }
      const allIds = data.map(item => item.id);
      onSelectionChange(allIds);
      return new Set(allIds);
    });
  };

  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item[column.key], item);
    }
    
    if (typeof item[column.key] === 'object') {
      return JSON.stringify(item[column.key]);
    }
    
    return item[column.key] || '';
  };

  const handleMenuClick = (e, itemId) => {
    e.stopPropagation();
    setModalOpen(modalOpen === itemId ? null : itemId);
  };

  const handleEdit = (e, item) => {
    e.stopPropagation();
    setModalOpen(null);
    onEdit(item);
  };

  const handleDelete = (e, item) => {
    e.stopPropagation();
    setModalOpen(null);
    onDelete(item);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(null);
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div className={`table-wrapper ${className}`}>
      <table className="ui-table">
        <thead>
          <tr>
            {selectable && (
              <th className="checkbox-cell">
                <label className="table-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    aria-label={allSelected ? 'Deselect all items' : 'Select all items'}
                  />
                  <span className="checkbox-indicator" />
                </label>
              </th>
            )}
            {columns.map((column, index) => (
              <th 
                key={column.key || index}
                className={column.className || ''}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
            <th className="actions-cell"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const isSelected = selectedIds.has(item.id);
            
            return (
              <tr
                key={item.id}
                className={`table-row ${isSelected ? 'selected' : ''}`}
                onClick={() => onRowClick(item)}
              >
                {selectable && (
                  <td className="checkbox-cell" data-label="">
                    <label className="table-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={isSelected ? 'Deselect item' : 'Select item'}
                      />
                      <span className="checkbox-indicator" />
                    </label>
                  </td>
                )}
                
                {columns.map((column, index) => (
                  <td 
                    key={column.key || index}
                    className={column.className || ''}
                    style={{ width: column.width }}
                    data-label={column.title}
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
                
                <td className="actions-cell" data-label="">
                  <button 
                    type="button" 
                    className="row-menu" 
                    aria-label="More actions"
                    onClick={(e) => handleMenuClick(e, item.id)}
                  >
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </button>
                  
                  {modalOpen === item.id && (
                    <div className="table-modal" ref={modalRef}>
                      <button 
                        className="modal-button" 
                        onClick={(e) => handleEdit(e, item)}
                      >
                        Edit
                      </button>
                      <button 
                        className="modal-button delete" 
                        onClick={(e) => handleDelete(e, item)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;