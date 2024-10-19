// Alert2.jsx
import React from "react";
import Button from "../components/Button"; // Import komponen Button

const Alert2 = ({ message, onClose, statusCode }) => {
  const isSuccess = statusCode === 201 || statusCode === 204; // Status kode yang menunjukkan keberhasilan

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center w-80">
        <div className="text-4xl mb-4">
          {isSuccess ? "✔️" : "❌"}{" "}
          {/* Tampilkan ceklis jika sukses, silang jika gagal */}
        </div>
        <p className="mb-4 text-lg font-mono">{message}</p>
        <Button
          onClick={onClose}
          className={`w-full py-2 rounded font-bold ${
            isSuccess ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          Tutup
        </Button>
      </div>
    </div>
  );
};

export default Alert2;
