import React, { useState, useEffect, useRef } from 'react';
import '../style/Dropdown.css';  // Import the CSS for styling

const Dropdown = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the dropdown container to detect clicks outside
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener to detect clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener when component unmounts or is updated
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle selection and close dropdown after change
  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {/* Display Button */}
      <button className="display-button" onClick={toggleDropdown}>
        <span className="display-icon">≡</span> Display
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <label>Grouping:</label>
            <select value={grouping} onChange={handleGroupingChange}>
              <option value="Status">Status</option>
              <option value="Users">Users</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label>Ordering:</label>
            <select value={ordering} onChange={handleOrderingChange}>
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
