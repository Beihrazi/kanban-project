import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainBody from './MainBody';

const KanbanBoard = () => {
  // Initialize the grouping and ordering state, pulling from local storage if available
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem('grouping') || 'Status';
  });

  const [ordering, setOrdering] = useState(() => {
    return localStorage.getItem('ordering') || 'Priority';
  });

  // Save 'grouping' to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  // Save 'ordering' to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('ordering', ordering);
  }, [ordering]);

  return (
    <div>
      {/* Pass down grouping and ordering state */}
      <Header grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
      <MainBody grouping={grouping} ordering={ordering}/>
    </div>
  );
};

export default KanbanBoard;
