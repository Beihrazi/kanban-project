import React from 'react';
import PriorityColumn from './PriorityColumn';

const PriorityBoard = ({ cardsData, ordering }) => {
  const priorities = [0, 4,3,2,1]; // Priority levels
  const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

  // Sort the cards based on the ordering
  const sortCards = (cards) => {
    if (ordering === 'Priority') {
      // Sort by priority in descending order
      return [...cards].sort((a, b) => b.priority - a.priority);
    } else if (ordering === 'Title') {
      // Sort by title in ascending order
      return [...cards].sort((a, b) => a.title.localeCompare(b.title));
    }
    return cards; // Default case: no sorting
  };

  return (
    <div className="kanban-board">
      {priorities.map((priority) => (
        <PriorityColumn
          key={priority}
          priority={priority}
          cards={sortCards(cardsData.filter(card => card.priority === priority))}
          priorityLabels={priorityLabels}
        />
      ))}
    </div>
  );
};

export default PriorityBoard;
