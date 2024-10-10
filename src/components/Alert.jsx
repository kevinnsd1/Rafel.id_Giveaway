import React from "react";
import Button from "../components/Button"

const Alert = ({ onClose, onRegister, onLogin }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Menutup alert saat area di luar diklik
    >
      <div
        className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 rounded-lg text-center max-w-xs w-full"
        onClick={(e) => e.stopPropagation()} // Mencegah event onClick dari div parent agar klik di dalam tidak menutup alert
      >
        <p className="text-lg font-mono font-bold mb-4">
          Anda Harus Login Untuk Menggunakan Fitur ini
        </p>
        <div className="flex w-full space-x-4">
          <Button
            onClick={onRegister}
            className="bg-cyan-400 text-black w-full py-2 px-4 text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Daftar
          </Button>
          <Button
            onClick={onLogin}
            className="bg-cyan-400 text-black w-full py-2 px-4 text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Masuk
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
