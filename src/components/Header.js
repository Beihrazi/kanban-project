import React from 'react';
import Dropdown from './Dropdown';
import '../style/Header.css'

const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
  return (
    <div className="Header">
      <Dropdown 
        grouping={grouping} 
        setGrouping={setGrouping} 
        ordering={ordering} 
        setOrdering={setOrdering} 
      />
      {/* Other components for Kanban */}
    </div>
  );
};

export default Header;
