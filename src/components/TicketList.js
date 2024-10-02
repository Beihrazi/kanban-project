import React, { useEffect, useState } from 'react';
import { api } from '../api/apiService'; // Import the function from the apiService
import TicketCard from './TicketCard'; // Assuming TicketCard is in the same directory

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await api(); // Use the fetchTickets function
      setTickets(data.tickets); // Assuming tickets are under the "tickets" key
    };

    getTickets(); // Call the function to fetch the tickets
  }, []); // Run only on component mount

  return (
    <div>
      <div className="tickets-list">
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
