import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate
import Button from "../../components/Button"; // Impor Button dari folder components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Dropdown";

export default function FormPage() {
  const [districts, setDistricts] = useState([]); // State untuk menyimpan daftar kecamatan
  const [selectedDistrict, setSelectedDistrict] = useState(""); // State untuk menyimpan kecamatan yang dipilih
  const navigate = useNavigate(); // Gunakan useNavigate

  // Fetch data dari API saat komponen pertama kali di-mount
  useEffect(() => {
    async function fetchDistricts() {
      try {
        const response = await fetch(
          "https://wilayah.exfw.dev/api/districts/5207.json" // Mengambil data kecamatan dengan ID kabupaten/kota 5207
        );
        const data = await response.json();
        setDistricts(data); // Simpan data kecamatan ke state
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }

    fetchDistricts();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/form-phone")}>
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
          Pilih Kecamatan Kamu:
        </p>
        <div className="mt-10 w-full max-w-lg flex flex-col items-center space-y-4">
          {/* Dropdown Section menggunakan ShadCN Select */}
          <Select onValueChange={(value) => setSelectedDistrict(value)}>
            <SelectTrigger className="w-[300px] border-2 border-black">
              <SelectValue placeholder="Pilih Kecamatan" />
            </SelectTrigger>
            <SelectContent side="bottom" sideOffset={5}>
              {/* Pastikan dropdown muncul ke bawah */}
              {districts.map((district) => (
                <SelectItem key={district.id} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full max-w-lg mt-4">
        <Button
          className="border-2 bg-cyan-500 border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
          onClick={() => navigate("/form-district")}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
