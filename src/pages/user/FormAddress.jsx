import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";

export default function FormPage() {
  const { state } = useLocation();

  const {
    giveawayId,
    fullName,
    phoneNumber,
    selectedProvince,
    selectedRegency,
    selectedDistrictName,
    selectedVillageName,
    postCode,
  } = state || {};

  const [fullAddress, setFullAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!fullAddress) {
      setError("Alamat lengkap harus diisi.");
    } else {
      setError("");

      const payload = {
        giveawayId: String(giveawayId),
        fullname: String(fullName),
        phone: String(phoneNumber),
        provinsi: String(selectedProvince),
        kota: String(selectedRegency),
        kecamatan: String(selectedDistrictName),
        desa: String(selectedVillageName),
        kode_pos: String(postCode),
        alamat_lengkap: String(fullAddress),
      };

      try {
        // console.log(payload)
        const response = await fetch(
          import.meta.env.VITE_API_URL_FOLLOWGIVEAWAY ||
            "https://hono-backend-rafel.programmerskye.workers.dev/api/fan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const midtransToken = responseData.data.midtrans_token;

          localStorage.setItem("midtrans_token", midtransToken);

          // Navigate to FormPayment page without triggering Midtrans yet
          navigate("/form-payment", { state: { midtransToken } });
        } else {
          const errorData = await response.json();
          setError(`Gagal menyimpan data: ${errorData.message}`);
        }
      } catch (error) {
        setError("Terjadi kesalahan dalam mengirim data.");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form-poscode", {
              state: {
                giveawayId: String(giveawayId),
                fullName: String(fullName),
                phoneNumber: String(phoneNumber),
                selectedProvince: String(selectedProvince),
                selectedRegency: String(selectedRegency),
                selectedDistrict: String(selectedDistrict),
                selectedVillage: String(selectedVillage),
                postCode: String(postCode),
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

      <div className="h-16"></div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="font-mono text-md font-bold text-center">
          Tuliskan Alamat Lengkap Kamu:
        </p>
        <div className="mt-10 w-full max-w-lg flex flex-col items-center space-y-4">
          <input
            type="text"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full border-2 border-black p-3 rounded-md text-center"
            placeholder="Masukkan Alamat lengkap"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      <div className="w-full max-w-lg mt-4">
        <Button
          onClick={handleNext}
          className="w-full py-2 bg-cyan-400 text-black text-lg font-mono font-bold border-2 border-black shadow-lg"
        >
          Kirim Biodata Kamu
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
