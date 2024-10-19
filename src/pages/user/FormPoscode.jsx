import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";

export default function FormPoscode() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Ambil giveawayId dari state atau localStorage
  const giveawayId = state?.giveawayId || localStorage.getItem("giveawayId");
  const {
    fullName,
    phoneNumber,
    selectedProvince,
    selectedRegency,
    selectedDistrictId,
    selectedDistrictName,
    selectedVillageId,
    selectedVillageName,
  } = state || {};

  const [postCode, setPostCode] = useState(""); // State untuk kode pos
  const [error, setError] = useState(""); // State untuk menampilkan pesan error

  const handleNext = () => {
    if (!postCode) {
      setError("Kode pos harus diisi.");
    } else {
      localStorage.setItem("postCode", postCode);

      // Navigasi ke halaman berikutnya, kirim semua data termasuk giveawayId
      navigate("/form-address", {
        state: {
          giveawayId, // Pastikan giveawayId diteruskan
          fullName,
          phoneNumber,
          selectedProvince,
          selectedRegency,
          selectedDistrictId,
          selectedDistrictName,
          selectedVillageId,
          selectedVillageName,
          postCode,
        },
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/form-district")}>
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      <div className="h-16"></div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          Masukkan Kode Pos Kamu:
        </p>
        <input
          type="text"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          className="w-full border-2 border-black p-3 rounded-md text-center"
          placeholder="Masukkan Kode Pos"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>

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
