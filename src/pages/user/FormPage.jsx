import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate dari react-router-dom
import bag from "../../assets/bag.png"; // Gambar hadiah/tas
import gift from "../../assets/gift2.png"; // Gambar hadiah yang baru di-upload
import Button from "../../components/Button"; // Mengimpor Button dari folder components

export default function GiveawayPage() {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
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

      {/* Bagian Pengantar */}
      <div className="mt-6 text-center mb-6">
        <p className="font-mono text-xl font-bold">
          Nagita Slavina lagi ngadain Giveaway nihh!!
        </p>
      </div>

      {/* Card Section */}
      <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 rounded-lg flex items-center mb-6">
        {/* Image Section */}
        <img
          src={bag}
          alt="Tas"
          className="w-[120px] h-[120px] object-contain"
        />

        {/* Content Section */}
        <div className="ml-4 mr-8">
          <h2 className="font-mono font-bold text-lg">Nagita Slavina</h2>
          <p className="text-sm">Tas Luis Vuitton</p>
        </div>
      </div>

      {/* Deskripsi Section */}
      <div className="w-full max-w-md bg-white p-4 mt-2 rounded-lg shadow-lg text-left">
        <h3 className="font-mono text-lg font-bold">Deskripsi :</h3>
        <p className="mt-2 text-sm">
          Ini tas yang sering aku pake keluar negeri lohh, yang aku beli di
          Paris. Yuk ikutan giveaway tas ini, kali aja kalian yang menangin tas
          nya. Jangan lupa yaa guysss, di tunggu juga giveaway selanjutnya..
        </p>
      </div>

      {/* Centered Pemenang Text */}
      <div className="text-center">
        <p className="mt-5 text-xs italic text-gray-500">
          Nama Pemenang akan muncul jika waktu sudah habis...
        </p>
      </div>

      {/* Image (Gift) Section */}
      <div className="mt-5">
        <img src={gift} alt="Hadiah" className="w-[130px] h-[130px] mx-auto" />
      </div>

      {/* Countdown Section */}
      <div className="w-full max-w-md text-center">
        <p className="text-4xl font-mono font-bold mt-2">15:20:20</p>
        <p className="mt-2 text-sm font-mono">
          Yuk Ikutan Giveaway ini dengan Klik Tombol dibawah Ini
        </p>
      </div>

      {/* Button Section */}
      <div className="w-full max-w-md mt-4">
        <Button
          onClick={() => navigate("/form-name")} // Navigasi ke halaman FormName
          className="w-full py-2 bg-cyan-400 text-black text-lg font-mono font-bold border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          Isi Biodata Kamu
        </Button>
      </div>
    </div>
  );
}
