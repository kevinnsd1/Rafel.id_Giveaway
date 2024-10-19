import React from "react";
import Button from "../components/Button"; // Pastikan path ini sesuai dengan letak komponen Button Anda

const AlertLogout = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-brutalism border-2 border-black">
        <div className="flex justify-center items-center mb-4">
          <span className="text-4xl text-yellow-500">⚠️</span>
        </div>
        <div className="text-center mb-4">
          <p className="font-mono text-md">{message}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={onConfirm}
            className="bg-cyan-500 text-white font-bold py-2 px-4 rounded border-2 border-black shadow-brutalism text-sm font-mono"
          >
            Yakin
          </Button>
          <Button
            onClick={onCancel}
            className="bg-gray-300 text-black font-bold py-2 px-4 rounded border-2 border-black shadow-brutalism text-sm font-mono"
          >
            Tidak
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertLogout;
