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
  const [provinces, setProvinces] = useState([]); // State untuk menyimpan daftar provinsi
  const [selectedProvince, setSelectedProvince] = useState(""); // State untuk menyimpan provinsi yang dipilih
  const navigate = useNavigate(); // Gunakan useNavigate

  // Fetch data dari API saat komponen pertama kali di-mount
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch(
          "https://wilayah.exfw.dev/api/provinces.json"
        );
        const data = await response.json();
        setProvinces(data); // Simpan data provinsi ke state
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    fetchProvinces();
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
          Pilih Provinsi Kamu:
        </p>
        <div className="mt-10 w-full max-w-lg flex flex-col items-center space-y-4">
          {/* Dropdown Section menggunakan ShadCN Select */}
          <Select onValueChange={(value) => setSelectedProvince(value)}>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent side="bottom">
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.name}>
                  {province.name}
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
          onClick={() => navigate("/form-city")}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
