import React, { useState } from 'react';
import Header from './components/Header';
import Body from './components/KanbanBoard';

const KanbanBoard = () => {
  // State for grouping, ordering, and cards
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');

  // Sample card data (replace with actual data or fetch from API)
  const cards = [
    { id: 1, title: 'Card 1', user: 'User A', status: 'Todo', priority: 'High' },
    { id: 4, title: 'Card 1', user: 'User A', status: 'Todo', priority: 'High' },
    { id: 2, title: 'Card 2', user: 'User B', status: 'In Progress', priority: 'Medium' },
    { id: 3, title: 'Card 3', user: 'User A', status: 'Done', priority: 'Low' },
    // More cards
  ];

  return (
    <div className="kanban-board">
      {/* Header for selecting grouping and ordering */}
      <Header 
        grouping={grouping} 
        setGrouping={setGrouping} 
        ordering={ordering} 
        setOrdering={setOrdering} 
      />

      {/* Body for displaying the grouped cards */}
      <Body 
        cards={cards} 
        grouping={grouping} 
        ordering={ordering} 
      />
    </div>
  );
};

export default KanbanBoard;


import React, { useState, useEffect } from 'react';

const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
  useEffect(() => {
    // Load stored values from localStorage on initial render
    const savedGrouping = localStorage.getItem('grouping');
    const savedOrdering = localStorage.getItem('ordering');

    if (savedGrouping) setGrouping(savedGrouping);
    if (savedOrdering) setOrdering(savedOrdering);
  }, []);

  useEffect(() => {
    // Store the current state of grouping and ordering in localStorage
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  return (
    <div className="header">
      <label>Grouping:</label>
      <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
        <option value="Status">Status</option>
        <option value="Users">Users</option>
        <option value="Priority">Priority</option>
      </select>

      <label>Ordering:</label>
      <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
        <option value="Priority">Priority</option>
        <option value="Title">Title</option>
      </select>
    </div>
  );
};

export default Header;
