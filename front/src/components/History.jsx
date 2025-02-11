import React from 'react';

const History = ({ items }) => {
  return (
    <div className="history">
      <h2>History</h2>
      <div className='history-list-container'>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default History;
