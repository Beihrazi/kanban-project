import React from "react";
import PriorityTicketCard from "./PriorityTicketCard";
import highPriorityIcon from "../icons/Img - High Priority.svg";
import mediumPriorityIcon from "../icons/Img - Medium Priority.svg";
import lowPriorityIcon from "../icons/Img - Low Priority.svg";
import urgent from "../icons/SVG - Urgent Priority colour.svg";
import noPriority from "../icons/No-priority.svg";
import addIcon from "../icons/add.svg";

import backlog from "../icons/Backlog.svg";
import todo from "../icons/To-do.svg";
import progress from "../icons/in-progress.svg";
import done from "../icons/Done.svg";

import "../style/PriorityColumn.css";

const PriorityColumn = ({ priority, cards, priorityLabels }) => {
  const showIcon = (priority) => {
    switch (priority) {
      case 0:
        return (
          <img src={noPriority} alt="No Priority" className="priority-icon" />
        );
      case 1:
        return (
          <img
            src={lowPriorityIcon}
            alt="Low Priority"
            className="priority-icon"
          />
        );
      case 2:
        return (
          <img
            src={mediumPriorityIcon}
            alt="Medium Priority"
            className="priority-icon"
          />
        );
      case 3:
        return (
          <img
            src={highPriorityIcon}
            alt="High Priority"
            className="priority-icon"
          />
        );
      case 4:
        return (
          <img src={urgent} alt="Urgent Priority" className="priority-icon" />
        );
      default:
        return null; // No icon for undefined or invalid priority
    }
  };

  

  return (
    <div className="priority-column">
      <div className="priority-header">
        <div className="first">
          {showIcon(priority)}
          <h3>
            {priorityLabels[priority]}{" "}
            {cards.length > 0 ? `${cards.length}` : null}
          </h3>
        </div>
        <div className="second">
          <img src={addIcon} alt="Add" className="add-icon" />
          <img src={noPriority} alt="Add" className="add-icon" />
        </div>
      </div>

      <div className="cards-container">
        {/* Render the TicketCard component for each card */}
        {cards.map((card) => (
          <div key={card.id} className="card-with-status">
           
            <PriorityTicketCard ticket={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityColumn;
