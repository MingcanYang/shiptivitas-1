import React from 'react';
import './Card.css';

export default function Card({ id, name, description, status }) {
  const className = `Card ${
    status === 'backlog' ? 'Card-grey' : status === 'in-progress' ? 'Card-blue' : 'Card-green'
  }`;

  return (
    <div className={className} data-id={id} data-status={status}>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
}
