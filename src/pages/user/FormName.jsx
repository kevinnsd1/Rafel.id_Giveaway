import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";

export default function FormName() {
  const { state } = useLocation(); // Mengambil state yang dikirim dari halaman sebelumnya
  const { id, title, creatorName, photo, description } = state || {}; // Destructure data giveaway

  const [fullName, setFullName] = useState(""); // State untuk menyimpan nama lengkap
  const [error, setError] = useState(""); // State untuk menangani error
  const navigate = useNavigate(); // Untuk navigasi ke halaman lain

  // Fungsi untuk menangani perubahan input nama lengkap
  const handleNameChange = (e) => {
    setFullName(e.target.value);
    setError(""); // Reset pesan error jika pengguna mulai mengetik
  };

  // Fungsi untuk menyimpan data dan navigasi ke halaman berikutnya
  const handleNext = () => {
    if (fullName.trim()) {
      // Simpan nama lengkap ke localStorage sebagai cadangan (optional)
      localStorage.setItem("fullName", fullName);

      // Navigasi ke halaman berikutnya (form-phone) dengan data lengkap
      navigate("/form-phone", {
        state: { id, title, creatorName, photo, description, fullName }, // Teruskan semua data ke halaman berikutnya
      });
    } else {
      setError("Nama lengkap harus diisi."); // Tampilkan error jika nama kosong
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
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form", {
              state: { id, title, creatorName, photo, description }, // Kembali ke halaman sebelumnya dengan data giveaway
            })
          }
        >
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      {/* Form Nama Lengkap */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono text-md font-bold text-center">
          Tuliskan Nama Lengkap Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress} // Menambahkan event handler untuk tombol Enter
            className="w-full border-2 border-black p-3 rounded-md text-center"
            placeholder="Masukkan nama lengkap"
          />
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Tampilkan error jika ada */}
        </div>
      </div>

      {/* Tombol Lanjutkan */}
      <div className="w-full max-w-lg mt-4">
        <Button
          onClick={handleNext} // Menyimpan data dan lanjut ke halaman berikutnya
          className="border-2 bg-cyan-500 border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
