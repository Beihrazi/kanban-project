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

const User = ({ ordering }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Function to display the priority icon based on priority value
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

    // Sort tickets within each group based on the ordering prop
    Object.keys(grouped).forEach(userId => {
      grouped[userId] = grouped[userId].sort((a, b) => {
        if (ordering === 'Priority') {
          return b.priority - a.priority; // Sort by priority (descending)
        } else if (ordering === 'Title') {
          return a.title.localeCompare(b.title); // Sort by title (ascending)
        }
        return 0;
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
            {/* <h2>{user.name}</h2> */}
          </div>

          <div className="priority-header">
            <div className="first">
              <img src={todo} alt="Todo" className="add-icon" />
              <h3>
                 {user.name} {groupedTickets[user.id] ? groupedTickets[user.id].length : 0}
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

export default User;
