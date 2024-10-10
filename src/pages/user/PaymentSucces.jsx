import React from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate
import Button from "../../components/Button"; // Pastikan 'Button' diimpor dengan benar
import OpenGift from "../../assets/opengift.png";

export default function SuccessPage() {
  const navigate = useNavigate(); // Gunakan useNavigate

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() => navigate("/home")} // Navigasi ke halaman home saat tombol arrow ditekan
        >
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      {/* Spacer untuk Header */}
      <div className="h-16"></div>

      {/* Main Content */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center mt-8">
        <img src={OpenGift} alt="Open Gift" className="w-40 h-40 mb-4" />
        <h2 className="font-bold font-mono text-lg mb-4">
          Pembayaran Berhasil !!!
        </h2>
        <p className="text-sm font-mono mb-6">
          Terima kasih sudah menyelesaikan pembelian tiket. Data kamu sekarang
          sudah masuk list undian giveaway ini dan pemenang akan di umumkan pada
          halaman berikut ini, pantengin terus ya cek siapa pemenang undian nya.
        </p>
        <Button
          className="bg-cyan-500 text-black py-2 px-20 rounded hover:bg-cyan-600 font-mono"
          onClick={() => navigate("/giveaway-result")} // Navigasi ke halaman hasil undian saat tombol Cek Undian ditekan
        >
          Cek Undian
        </Button>
      </div>
    </div>
  );
}
