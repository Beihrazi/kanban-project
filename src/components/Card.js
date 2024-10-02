import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card">
      <div className="card-id">{card.id}</div>
      <div className="card-title">{card.title}</div>
      <div className="card-category">{card.category}</div>
    </div>
  );
};

export default Card;
