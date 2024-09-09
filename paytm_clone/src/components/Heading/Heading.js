import React from 'react';
import "./Heading.css";

const Heading = ({ children }) => {
  return (
    <div className='Heading'>
      {children}
    </div>
  );
};

export default Heading;
