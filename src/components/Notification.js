import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="absolute top-0 left-0 w-full p-4 bg-yellow-500 text-white text-center text-lg font-semibold z-50">
      {message}
    </div>
  );
};

export default Notification;
