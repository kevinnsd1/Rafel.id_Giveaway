import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Dropdown";

export default function FormProvince() {
  const { state } = useLocation();
  const { id, fullName, phoneNumber } = state || {};

  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk memeriksa apakah dropdown terbuka atau tertutup
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL_WILAYAHPROVINSI
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    fetchProvinces();
  }, []);

  // Fungsi untuk menangani pemilihan provinsi
  const handleProvinceSelection = (id, name) => {
    setSelectedProvinceId(id);
    setSelectedProvinceName(name);
    setError("");
    localStorage.setItem("selectedProvinceId", id);
    localStorage.setItem("selectedProvinceName", name);

    // Dropdown sudah ditutup setelah pemilihan
    setDropdownOpen(false);

    // Fokuskan pada tombol "Lanjutkan" setelah provinsi dipilih
    document.querySelector("button").focus();
  };

  // Fungsi untuk mendeteksi apakah dropdown sedang terbuka
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Fungsi untuk navigasi ke halaman berikutnya
  const handleNext = () => {
    if (!selectedProvinceId || !selectedProvinceName) {
      setError("Silakan pilih provinsi terlebih dahulu.");
    } else {
      navigate("/form-city", {
        state: {
          id,
          fullName,
          phoneNumber,
          selectedProvinceId,
          selectedProvinceName,
        },
      });
    }
  };

  // Fungsi untuk mendeteksi tombol Enter dan menghindari pembukaan dropdown
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !dropdownOpen) {
      handleNext(); // Navigasi ke halaman berikutnya hanya jika dropdown tertutup
    }
  };

  useEffect(() => {
    // Tambahkan event listener untuk Enter setelah dropdown tertutup
    document.addEventListener("keydown", handleKeyPress);

    // Hapus event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dropdownOpen, selectedProvinceId]);

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

      {/* Form Section */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono text-md font-bold text-center">
          Pilih Provinsi Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          <Select
            onValueChange={(value) => {
              const selected = provinces.find(
                (province) => province.id === value
              );
              handleProvinceSelection(selected.id, selected.name); // Simpan pilihan provinsi
            }}
            onOpenChange={handleDropdownToggle} // Deteksi perubahan buka/tutup dropdown
          >
            <SelectTrigger className="w-[300px] border-2 border-black">
              <SelectValue placeholder="Pilih Provinsi" /> {/* Placeholder */}
            </SelectTrigger>
            <SelectContent
              side="bottom"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Button Section */}
      <div className="w-full max-w-lg mt-4">
        <Button
          className="border-2 bg-cyan-500 border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
          onClick={handleNext}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
