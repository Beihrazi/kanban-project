import React, { useEffect, useState } from 'react';
import User from './User';
import PriorityBoard from './PriorityBoard';
import { api } from '../api/apiService';
import '../style/Test.css';
import StatusBoard from './StatusBoard';

const MainBody = ({ grouping, ordering }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await api(); // Fetch tickets from the API
      setTickets(data.tickets); // Assuming the API returns an object with a "tickets" key
    };

    getTickets(); // Call the function to fetch the tickets
  }, []);

  return (
    <div className='board'>
      {grouping === 'Users' ? (
        <User tickets={tickets} ordering={ordering} />
      ) : grouping === 'Priority' ? (
        <PriorityBoard cardsData={tickets} ordering={ordering} />
      ) : grouping === 'Status' ? (
        <StatusBoard tickets={tickets} ordering={ordering} />
      ) : null}
    </div>
  );
};

export default MainBody;
