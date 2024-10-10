import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white border-2 border-black shadow-md rounded-lg p-4 flex items-center space-x-4">
      {children}
    </div>
  );
};

export default Card;
