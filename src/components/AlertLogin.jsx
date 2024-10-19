import React from "react";

// Alert2 component to display alerts when login is successful or unsuccessful
const AlertLogin = ({ message, statusCode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-brutalism border-2 border-black">
        {/* Display a check icon for status 204 (success) and a cross icon for status 400 (failure) */}
        <div className="flex justify-center items-center mb-2">
          {statusCode === 204 ? (
            <span className="text-4xl text-cyan-500">✔️</span>
          ) : (
            <span className="text-4xl text-red-500">❌</span>
          )}
        </div>
        <div className="text-center">
          <p className="font-mono text-md">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertLogin;
