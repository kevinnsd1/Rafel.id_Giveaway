import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Menggunakan useLocation untuk mengambil state dari halaman sebelumnya
import Button from "../../components/Button"; // Mengimpor Button dari folder components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Dropdown"; // Pastikan path Dropdown sesuai dengan struktur proyek Anda

export default function FormProvince() {
  const { state } = useLocation(); // Mengambil state yang dikirim dari halaman sebelumnya
  const { id, fullName, phoneNumber } = state || {}; // Destructure data id, fullName, dan phoneNumber dari state

  const [provinces, setProvinces] = useState([]); // State untuk menyimpan daftar provinsi
  const [selectedProvinceId, setSelectedProvinceId] = useState(""); // State untuk menyimpan ID provinsi yang dipilih
  const [selectedProvinceName, setSelectedProvinceName] = useState(""); // State untuk menyimpan nama provinsi yang dipilih
  const [error, setError] = useState(""); // State untuk menyimpan pesan error
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  // Fetch data dari API saat komponen pertama kali di-mount
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL_WILAYAHPROVINSI
        );
        const data = await response.json();
        setProvinces(data); // Simpan data provinsi ke state
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    fetchProvinces();
  }, []);

  // Fungsi untuk menyimpan provinsi yang dipilih dan set ke localStorage
  const handleProvinceSelection = (id, name) => {
    setSelectedProvinceId(id); // Simpan ID provinsi yang dipilih
    setSelectedProvinceName(name); // Simpan Nama provinsi yang dipilih
    setError(""); // Hapus error jika ada provinsi yang dipilih
    localStorage.setItem("selectedProvinceId", id); // Simpan ID provinsi ke localStorage (opsional)
    localStorage.setItem("selectedProvinceName", name); // Simpan Nama provinsi ke localStorage (opsional)
  };

  // Fungsi untuk handle saat tombol Lanjutkan diklik
  const handleNext = () => {
    if (!selectedProvinceId || !selectedProvinceName) {
      setError("Silakan pilih provinsi terlebih dahulu."); // Jika belum ada provinsi yang dipilih, tampilkan error
    } else {
      // Navigasi ke halaman berikutnya, kirim semua data (id, fullName, phoneNumber, selectedProvinceId, selectedProvinceName)
      navigate("/form-city", {
        state: {
          id,
          fullName,
          phoneNumber,
          selectedProvinceId,
          selectedProvinceName, // Teruskan juga nama provinsi
        },
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form-phone", { state: { id, fullName, phoneNumber } })
          }
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
          Pilih Provinsi Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          {/* Dropdown Section menggunakan ShadCN Select */}
          <Select
            onValueChange={(value) => {
              const selected = provinces.find(
                (province) => province.id === value
              );
              handleProvinceSelection(selected.id, selected.name);
            }}
          >
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent side="bottom">
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tampilkan pesan error jika ada */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Button Section */}
      <div className="w-full max-w-lg mt-4">
        <Button
          className="border-2 bg-cyan-500 border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
          onClick={handleNext} // Panggil fungsi handleNext
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
