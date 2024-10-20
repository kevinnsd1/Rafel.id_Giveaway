import React, { useState, useEffect } from "react";
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

  // Fungsi untuk mendeteksi tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext(); // Panggil handleNext jika tombol Enter ditekan
    }
  };

  // Tambahkan event listener untuk mendeteksi tekan tombol Enter
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // Hapus event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [postCode]); // Menambahkan dependency agar mendeteksi perubahan postCode

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form-district", {
              state: {
                giveawayId: String(giveawayId),
                fullName: String(fullName),
                phoneNumber: String(phoneNumber),
                selectedProvince: String(selectedProvince),
                selectedRegency: String(selectedRegency),
                selectedDistrictName: String(selectedDistrictName),
                selectedVillageName: String(selectedVillageName),
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

      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono text-md font-bold text-center">
          Masukkan Kode Pos Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          <input
            type="text"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            className="w-full border-2 border-black p-3 rounded-md text-center"
            placeholder="Masukkan Kode Pos"
            onKeyPress={(e) => e.key === "Enter" && handleNext()} // Tambahkan event listener untuk Enter
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
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
