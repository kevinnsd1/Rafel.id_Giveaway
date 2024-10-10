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
  const [regencies, setRegencies] = useState([]); // State untuk menyimpan daftar kabupaten/kota
  const [selectedRegency, setSelectedRegency] = useState(""); // State untuk menyimpan kabupaten/kota yang dipilih
  const navigate = useNavigate(); // Gunakan useNavigate

  // Fetch data dari API saat komponen pertama kali di-mount
  useEffect(() => {
    async function fetchRegencies() {
      try {
        const response = await fetch(
          "https://wilayah.exfw.dev/api/regencies/52.json" // Mengambil data kabupaten/kota dengan ID provinsi 52
        );
        const data = await response.json();
        setRegencies(data); // Simpan data kabupaten/kota ke state
      } catch (error) {
        console.error("Error fetching regencies:", error);
      }
    }

    fetchRegencies();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/form-province")}>
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
          Pilih Kabupaten/Kota Kamu:
        </p>
        <div className="mt-10 w-full max-w-lg flex flex-col items-center space-y-4">
          {/* Dropdown Section menggunakan ShadCN Select */}
          <Select onValueChange={(value) => setSelectedRegency(value)}>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Pilih Kabupaten/Kota" />
            </SelectTrigger>
            <SelectContent side="bottom" sideOffset={5}>
              {regencies.map((regency) => (
                <SelectItem key={regency.id} value={regency.name}>
                  {regency.name}
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
