import React from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate
import Button from "../../components/Button"; // Impor Button dari folder components

export default function FormPage() {
  const navigate = useNavigate(); // Gunakan useNavigate

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() => navigate("/form-district")} // Navigasi ke form-district saat tombol arrow ditekan
        >
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      {/* Spacer untuk Header */}
      <div className="h-16"></div>

      {/* Form Section */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono text-md font-bold text-center">
          Tuliskan Kode Pos Kamu:
        </p>
        <div className="mt-10 w-full max-w-lg flex flex-col items-center space-y-4">
          {/* Input Section */}
          <input
            type="text"
            className="w-full border-2 border-black p-3 rounded-md text-center"
            placeholder="Masukkan Kode Pos"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full max-w-lg mt-4">
        <Button
          className="border-2 bg-cyan-500 border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
          onClick={() => navigate("/form-address")} // Navigasi ke form-address saat tombol Lanjutkan ditekan
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
