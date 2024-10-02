import React from "react";
import "../style/TicketCard.css"; // Import the CSS file
import highPriorityIcon from "../icons/Img - High Priority.svg";
import mediumPriorityIcon from "../icons/Img - Medium Priority.svg";
import lowPriorityIcon from "../icons/Img - Low Priority.svg";
import urgent from "../icons/SVG - Urgent Priority colour.svg";
import noPriority from "../icons/No-priority.svg";
import todo from "../icons/To-do.svg";

import backlog from "../icons/Backlog.svg";
import progress from "../icons/in-progress.svg";
import done from "../icons/Done.svg";
import "../style/User.css"

const UserCard = ({ ticket }) => {

  const showStatus = (status) => {
    switch (status) {
      case "Todo":
        return <img src={todo} alt="To-do" className="status-icon" />;
      case "In progress":
        return <img src={progress} alt="In Progress" className="status-icon" />;
      case "Done":
        return <img src={done} alt="Done" className="status-icon" />;
      case "Backlog":
        return <img src={backlog} alt="Backlog" className="status-icon" />;
      default:
        return null; // No icon for undefined or invalid status
    }
  };

  const showIcon = (priority) => {
    switch (priority) {
      case 0:
        return <img src={noPriority} alt="No Priority" className="priority-icon" />;
      case 1:
        return <img src={lowPriorityIcon} alt="Low Priority" className="priority-icon" />;
      case 2:
        return <img src={mediumPriorityIcon} alt="Medium Priority" className="priority-icon" />;
      case 3:
        return <img src={highPriorityIcon} alt="High Priority" className="priority-icon" />;
      case 4:
        return <img src={urgent} alt="Urgent Priority" className="priority-icon" />;
      default:
        return null; // No icon for undefined or invalid priority
    }
  };

  return (
    <div className="ticket-card">
      <div className="sub-container">
       
        <div className="dp-box"></div>
      </div>
      <div className="content-header">
        {showStatus(ticket.status)}
        <p id="title">{ticket.title}</p>
      </div>

      <div className="mini-container">
        <div className="tag">
          {showIcon(ticket.priority)}
          {ticket.tag}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
