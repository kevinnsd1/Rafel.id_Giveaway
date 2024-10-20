import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate dan useLocation dari react-router-dom
import Button from "../../components/Button"; // Impor Button dari folder components

export default function FormPhone() {
  const { state } = useLocation(); // Mengambil state yang dikirim dari FormName
  const { id, fullName } = state || {}; // Ambil id giveaway dan fullName dari FormName

  const [phoneNumber, setPhoneNumber] = useState(""); // State untuk menyimpan nomor handphone
  const [error, setError] = useState(""); // State untuk menyimpan pesan error
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk menangani input nomor handphone
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    setError(""); // Hapus pesan error ketika pengguna mengetik
  };

  // Fungsi untuk menyimpan nomor telepon dan navigasi ke halaman berikutnya
  const handleNext = () => {
    if (!phoneNumber.trim()) {
      setError("Nomor telepon harus diisi."); // Validasi jika nomor telepon kosong
    } else if (!/^\d+$/.test(phoneNumber)) {
      setError("Nomor telepon hanya boleh berisi angka."); // Validasi jika nomor telepon tidak berisi angka saja
    } else {
      // Simpan data nomor telepon ke localStorage sebagai backup jika diperlukan
      localStorage.setItem("phoneNumber", phoneNumber);

      // Navigasi ke halaman berikutnya dengan membawa semua data (id, fullName, phoneNumber)
      navigate("/form-province", {
        state: { id, fullName, phoneNumber }, // Kirim data ke halaman berikutnya
      });
    }
  };

  // Fungsi untuk menangani tekan tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext(); // Panggil handleNext jika tombol Enter ditekan
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() => navigate("/form-name", { state: { id, fullName } })}
        >
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      {/* Form Section */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono text-md font-bold text-center">
          Tuliskan Nomor Handphone Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          <input
            type="text"
            value={phoneNumber} // Mengikat input ke state phoneNumber
            onChange={handlePhoneChange} // Menyimpan perubahan input ke state
            onKeyPress={handleKeyPress} // Tambahkan handler untuk tombol Enter
            className="w-full border-2 border-black p-3 rounded-md text-center"
            placeholder="Masukkan Nomor Handphone"
          />
          {/* Tampilkan pesan error jika ada */}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full max-w-lg mt-4">
        <Button
          onClick={handleNext} // Panggil fungsi handleNext untuk menyimpan nomor dan lanjut ke halaman berikutnya
          className="border-2 bg-cyan-500 border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
