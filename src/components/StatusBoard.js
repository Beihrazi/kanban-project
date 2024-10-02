import React, { useEffect, useState } from 'react';
import '../style/User.css';
import UserCard from './UserCard';
import highPriorityIcon from "../icons/Img - High Priority.svg";
import mediumPriorityIcon from "../icons/Img - Medium Priority.svg";
import lowPriorityIcon from "../icons/Img - Low Priority.svg";
import urgent from "../icons/SVG - Urgent Priority colour.svg";
import noPriority from "../icons/No-priority.svg";
import addIcon from "../icons/add.svg";
import todo from "../icons/To-do.svg";
import backlog from "../icons/Backlog.svg";
import progress from "../icons/in-progress.svg";
import done from "../icons/Done.svg";

const StatusBoard = ({ ordering }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Function to return the image path based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return todo;
      case "In progress":
        return progress;
      case "Done":
        return done;
      case "Backlog":
        return backlog;
      default:
        return null; // No icon for undefined or invalid status
    }
  };

  // Function to display the priority icon based on priority value
  const showIcon = (priority) => {
    switch (priority) {
      case 0:
        return noPriority;
      case 1:
        return lowPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 3:
        return highPriorityIcon;
      case 4:
        return urgent;
      default:
        return null; // No icon for undefined or invalid priority
    }
  };

  useEffect(() => {
    // Fetch the data from the API and set tickets and users
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  // Group tickets by userId
  const groupTicketsByUser = () => {
    const grouped = tickets.reduce((acc, ticket) => {
      if (!acc[ticket.userId]) {
        acc[ticket.userId] = [];
      }
      acc[ticket.userId].push(ticket);
      return acc;
    }, {});

    // Sort the tickets within each group based on the ordering criteria
    Object.keys(grouped).forEach((userId) => {
      grouped[userId].sort((a, b) => {
        if (ordering === 'Priority') {
          return b.priority - a.priority; // Sort by priority (descending)
        } else if (ordering === 'Title') {
          return a.title.localeCompare(b.title); // Sort alphabetically by title
        }
        return 0; // No sorting if no criteria
      });
    });

    return grouped;
  };

  const groupedTickets = groupTicketsByUser();

  return (
    <div className="ticket-board">
      {users.map((user) => (
        <div key={user.id} className="user-section">
          <div className="user-header">
            <h2>{user.name}</h2> {/* Display user name */}
          </div>

          <div className="priority-header">
            <div className="first">
              <img
                src={groupedTickets[user.id] && groupedTickets[user.id].length > 0
                  ? getStatusIcon(groupedTickets[user.id][0].status)
                  : ""}
                alt={groupedTickets[user.id] && groupedTickets[user.id].length > 0
                  ? groupedTickets[user.id][0].status
                  : "No Status"}
                className="status-icon"
              />
              <h3>
                {groupedTickets[user.id] && groupedTickets[user.id].length > 0
                  ? groupedTickets[user.id][0].status // Display status of the first ticket
                  : "No status available"}
              </h3>
            </div>
            <div className="second">
              <img src={addIcon} alt="Add" className="add-icon" />
              <img src={noPriority} alt="No Priority" className="priority-icon" />
            </div>
          </div>

          <div className="tickets">
            {/* Render TicketCard for each ticket under the userId */}
            {groupedTickets[user.id] ? (
              groupedTickets[user.id].map((ticket) => (
                <UserCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <p>No tickets for this user.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusBoard;
