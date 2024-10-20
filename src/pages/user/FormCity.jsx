import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Tambahkan useLocation untuk mengambil state dari halaman sebelumnya
import Button from "../../components/Button"; // Impor Button dari folder components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Dropdown"; // Pastikan path Dropdown sesuai dengan struktur proyek Anda

export default function FormCity() {
  const { state } = useLocation(); // Ambil state dari halaman sebelumnya
  const {
    id,
    fullName,
    phoneNumber,
    selectedProvinceId,
    selectedProvinceName,
    selectedRegencyId: initialRegencyId,
    selectedRegencyName: initialRegencyName,
  } = state || {}; // Destructure data dari state

  const [regencies, setRegencies] = useState([]); // State untuk menyimpan daftar kabupaten/kota
  const [selectedRegencyId, setSelectedRegencyId] = useState(
    initialRegencyId || ""
  ); // State untuk menyimpan ID kabupaten/kota yang dipilih
  const [selectedRegencyName, setSelectedRegencyName] = useState(
    initialRegencyName || ""
  ); // State untuk menyimpan nama kabupaten/kota yang dipilih
  const [error, setError] = useState(""); // State untuk menyimpan pesan error
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk mengetahui apakah dropdown terbuka atau tidak
  const navigate = useNavigate(); // Gunakan useNavigate

  // Fetch data kabupaten/kota sesuai dengan provinsi yang dipilih
  useEffect(() => {
    if (selectedProvinceId) {
      async function fetchRegencies() {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL_WILAYAHKOTA
            }/${selectedProvinceId}.json`
          );
          const data = await response.json();
          setRegencies(data); // Simpan data kabupaten/kota ke state
        } catch (error) {
          console.error("Error fetching regencies:", error);
        }
      }
      fetchRegencies();
    }
  }, [selectedProvinceId]);

  // Fungsi untuk handle pemilihan kota
  const handleCitySelection = (value) => {
    const selectedRegency = regencies.find((regency) => regency.id === value); // Temukan kabupaten/kota yang dipilih berdasarkan ID
    setSelectedRegencyId(value); // Simpan ID kabupaten/kota yang dipilih
    setSelectedRegencyName(selectedRegency ? selectedRegency.name : ""); // Simpan nama kabupaten/kota yang dipilih
    setError(""); // Hapus pesan error jika pengguna memilih kota
    setDropdownOpen(false); // Tutup dropdown setelah memilih

    localStorage.setItem(
      "selectedCityId",
      selectedRegency ? selectedRegency.id : "" // Simpan ID kota yang dipilih ke localStorage
    );
    localStorage.setItem(
      "selectedCityName",
      selectedRegency ? selectedRegency.name : "" // Simpan nama kota yang dipilih ke localStorage
    );
  };

  // Fungsi untuk handle saat tombol Lanjutkan diklik
  const handleNext = () => {
    if (!selectedRegencyId) {
      setError("Silakan pilih kota terlebih dahulu."); // Tampilkan pesan error jika belum ada kota yang dipilih
    } else {
      // Navigasi ke halaman berikutnya, kirim semua data termasuk kota yang dipilih
      navigate("/form-subdistrict", {
        state: {
          id, // Giveaway ID
          fullName, // Nama lengkap
          phoneNumber, // Nomor telepon
          selectedProvinceId, // ID provinsi yang dipilih
          selectedProvinceName, // Nama provinsi yang dipilih
          selectedRegencyId, // ID kota yang dipilih
          selectedRegencyName, // Nama kota yang dipilih
        },
      });
    }
  };

  // Fungsi untuk mendeteksi tekan tombol Enter dan lanjut ke halaman berikutnya
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !dropdownOpen) {
      handleNext(); // Navigasi ke halaman berikutnya jika Enter ditekan dan dropdown tertutup
    }
  };

  // Tambahkan event listener untuk mendeteksi tekan tombol Enter
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // Hapus event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dropdownOpen, selectedRegencyId]); // Tambahkan dependency agar event listener memperhatikan state ini

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form-province", {
              state: {
                id,
                fullName,
                phoneNumber,
                selectedProvinceId,
                selectedProvinceName,
              }, // Kirim kembali state jika pengguna ingin kembali
            })
          }
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
          Pilih Kabupaten/Kota Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          {/* Dropdown Section menggunakan ShadCN Select */}
          <Select
            onValueChange={handleCitySelection}
            onOpenChange={(open) => setDropdownOpen(open)} // Menentukan status buka/tutup dropdown
            value={selectedRegencyId} // Pastikan value dari dropdown diisi dengan selectedRegencyId
          >
            <SelectTrigger className="w-[300px] border-2 border-black">
              <SelectValue placeholder="Pilih Kabupaten/Kota" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              sideOffset={5}
              style={{ maxHeight: "200px", overflowY: "auto" }} // Tambahkan style untuk scroll
            >
              {regencies.map((regency) => (
                <SelectItem key={regency.id} value={regency.id}>
                  {regency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Tampilkan pesan error jika ada */}
          {error && <p className="text-red-500">{error}</p>}
        </div>
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
