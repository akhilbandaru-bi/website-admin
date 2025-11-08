import React, { useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Table from '../components/ui/Table';
import './PageTemplate1.css';

const SAMPLE_DATA = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/48?img=1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/48?img=2'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/48?img=3'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/48?img=4'
  }
];

const TableExample = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSelectionChange = (selected) => {
    setSelectedIds(new Set(selected));
    console.log('Selected items:', selected);
  };

  const columns = [
    {
      key: 'avatar',
      title: '',
      width: '50px',
      render: (value, item) => (
        <img 
          src={item.avatar} 
          alt={item.name} 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            objectFit: 'cover' 
          }} 
        />
      )
    },
    {
      key: 'name',
      title: 'Name',
      width: '200px'
    },
    {
      key: 'email',
      title: 'Email'
    },
    {
      key: 'role',
      title: 'Role',
      width: '100px'
    },
    {
      key: 'status',
      title: 'Status',
      width: '100px',
      render: (value) => (
        <span 
          style={{ 
            padding: '4px 8px', 
            borderRadius: '4px', 
            backgroundColor: value === 'Active' ? '#d4edda' : '#f8d7da',
            color: value === 'Active' ? '#155724' : '#721c24',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="page-template">
      <div className="page-header">
        <h1 className="page-title">Table Component Example</h1>
        <p className="page-subtitle">
          Demonstrating the reusable Table component
        </p>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="content-card"
      >
        <div style={{ padding: '24px' }}>
          <h2>Users Table</h2>
          <p>Selected: {selectedIds.size} items</p>
          <Table
            data={SAMPLE_DATA}
            columns={columns}
            selectable={true}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </Squircle>
    </div>
  );
};

export default TableExample;