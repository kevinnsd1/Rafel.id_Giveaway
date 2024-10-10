import React from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate
import Button from "../../components/Button"; // Pastikan 'Button' diimpor dengan benar
import Rainbow from "../../assets/rainbow.png";

export default function SuccessPage() {
  const navigate = useNavigate(); // Gunakan useNavigate

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/home")}>
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
        <img src={Rainbow} alt="Rainbow" className="w-45 h-40 mb-4" />
        <h2 className="font-bold font-mono text-lg mb-4">
          Selamat Biodata Kamu Sudah Tersimpan !!!
        </h2>
        <p className="text-sm font-mono mb-6">
          Selamat biodata kamu sudah lengkap dan akan digunakan untuk
          mengirimkan giveaway apabila kamu beruntung mendapatkan nya. Tinggal
          satu langkah lagi untuk kamu bisa masuk daftar giveaway ini yaitu kamu
          harus membeli tiket giveaway ini{" "}
          <span className="font-bold">seharga 10rb</span> dengan metode
          pembayaran favorit kamu silahkan klik lanjut beli tiket.
        </p>
        <Button
          className="bg-cyan-500 text-black py-2 px-20 rounded hover:bg-cyan-600 font-mono"
          onClick={() => navigate("/purchase-ticket")} // Navigasi ke halaman pembelian tiket
        >
          Beli Tiket
        </Button>
      </div>
    </div>
  );
}
