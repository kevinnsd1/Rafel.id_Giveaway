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

export default function FormDistrict() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Ambil data dari state atau localStorage
  const giveawayId = state?.giveawayId || localStorage.getItem("giveawayId");
  const fullName = state?.fullName || localStorage.getItem("fullName");
  const phoneNumber = state?.phoneNumber || localStorage.getItem("phoneNumber");
  const selectedProvince =
    state?.selectedProvince || localStorage.getItem("selectedProvinceName");
  const selectedRegency =
    state?.selectedRegency || localStorage.getItem("selectedCityName");
  const selectedDistrictId =
    state?.selectedDistrictId || localStorage.getItem("selectedDistrictId");
  const selectedDistrictName =
    state?.selectedDistrictName || localStorage.getItem("selectedDistrictName");

  const [villages, setVillages] = useState([]); // State untuk menyimpan daftar desa/kelurahan
  const [selectedVillageId, setSelectedVillageId] = useState(""); // State untuk menyimpan ID desa/kelurahan yang dipilih
  const [selectedVillageName, setSelectedVillageName] = useState(""); // State untuk menyimpan nama desa/kelurahan yang dipilih
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk memantau status dropdown
  const [error, setError] = useState(""); // State untuk menampilkan pesan error

  // Ambil data desa/kelurahan berdasarkan kecamatan yang dipilih
  useEffect(() => {
    if (selectedDistrictId) {
      async function fetchVillages() {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL_WILAYAHKELURAHAN
            }/${selectedDistrictId}.json`
          );
          const data = await response.json();
          setVillages(data); // Simpan data desa/kelurahan di state
        } catch (error) {
          console.error("Error fetching villages:", error);
        }
      }

      fetchVillages();
    }
  }, [selectedDistrictId]);

  // Fungsi untuk menyimpan data desa/kelurahan yang dipilih
  const handleVillageSelection = (value) => {
    const selectedVillage = villages.find((village) => village.id === value);
    if (selectedVillage) {
      const villageIdString = String(selectedVillage.id || "");
      const villageNameString = String(selectedVillage.name || "");
      setSelectedVillageId(villageIdString);
      setSelectedVillageName(villageNameString);
      setError(""); // Hapus pesan error jika ada

      // Simpan data desa/kelurahan di localStorage sebagai string
      localStorage.setItem("selectedVillageId", villageIdString);
      localStorage.setItem("selectedVillageName", villageNameString);

      setDropdownOpen(false); // Tutup dropdown setelah pemilihan
    }
  };

  // Fungsi ketika tombol Lanjutkan ditekan
  const handleNext = () => {
    if (!selectedVillageId) {
      setError("Silakan pilih desa/kelurahan terlebih dahulu.");
    } else {
      // Navigasi ke halaman berikutnya
      navigate("/form-poscode", {
        state: {
          giveawayId: String(giveawayId), // Pastikan giveawayId diteruskan
          fullName: String(fullName),
          phoneNumber: String(phoneNumber),
          selectedProvince: String(selectedProvince),
          selectedRegency: String(selectedRegency),
          selectedDistrictId: String(selectedDistrictId),
          selectedDistrictName: String(selectedDistrictName),
          selectedVillageId: String(selectedVillageId),
          selectedVillageName: String(selectedVillageName),
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
  }, [dropdownOpen, selectedVillageId]); // Dependency untuk memperbarui listener ketika dropdown berubah

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form-subdistrict", {
              state: {
                giveawayId: String(giveawayId),
                fullName: String(fullName),
                phoneNumber: String(phoneNumber),
                selectedProvince: String(selectedProvince),
                selectedRegency: String(selectedRegency),
                selectedDistrictId: String(selectedDistrictId),
                selectedDistrictName: String(selectedDistrictName),
              },
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
          Pilih Desa/Kelurahan Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          {/* Dropdown Section */}
          <Select
            onValueChange={(value) => handleVillageSelection(value)}
            onOpenChange={(open) => setDropdownOpen(open)} // Memantau status buka/tutup dropdown
          >
            <SelectTrigger className="w-[300px] border-2 border-black">
              <SelectValue placeholder="Pilih Desa/Kelurahan" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              sideOffset={5}
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {villages.map((village) => (
                <SelectItem key={village.id} value={village.id}>
                  {village.name}
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
          onClick={handleNext}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
