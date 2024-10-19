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

export default function FormSubdistrict() {
  const { state } = useLocation();
  const {
    id,
    fullName,
    phoneNumber,
    selectedProvinceId,
    selectedProvinceName,
    selectedRegencyId,
    selectedDistrictId: initialDistrictId,
    selectedDistrictName: initialDistrictName,
  } = state || {};

  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(
    initialDistrictId || ""
  );
  const [selectedDistrictName, setSelectedDistrictName] = useState(
    initialDistrictName || ""
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRegencyId) {
      async function fetchDistricts() {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL_WILAYAHKECAMATAN
            }/${selectedRegencyId}.json`
          );
          const data = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error("Error fetching districts:", error);
          setError("Gagal mengambil data kecamatan.");
        }
      }

      fetchDistricts();
    }
  }, [selectedRegencyId]);

  // Store the selected district's ID and name into localStorage when chosen
  const handleDistrictSelection = (value) => {
    const selectedDistrict = districts.find(
      (district) => district.id === value
    );
    if (selectedDistrict) {
      setSelectedDistrictId(selectedDistrict.id);
      setSelectedDistrictName(selectedDistrict.name);
      setError("");

      // Store selected district ID and name in localStorage
      localStorage.setItem("selectedDistrictId", selectedDistrict.id);
      localStorage.setItem("selectedDistrictName", selectedDistrict.name);
    }
  };

  const handleNext = () => {
    if (!selectedDistrictId) {
      setError("Silakan pilih kecamatan terlebih dahulu.");
    } else {
      navigate("/form-district", {
        state: {
          id,
          fullName,
          phoneNumber,
          selectedProvinceId,
          selectedProvinceName,
          selectedRegencyId,
          selectedDistrictId,
          selectedDistrictName,
        },
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button
          className="text-2xl"
          onClick={() =>
            navigate("/form-city", {
              state: {
                id,
                fullName,
                phoneNumber,
                selectedProvinceId,
                selectedProvinceName,
                selectedRegencyId,
                selectedDistrictId,
                selectedDistrictName,
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
          Pilih Kecamatan Kamu:
        </p>
        <div className="mt-10 max-w-lg flex flex-col items-center w-full space-y-4">
          <Select onValueChange={handleDistrictSelection}>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Pilih Kecamatan" />
            </SelectTrigger>
            <SelectContent side="bottom" sideOffset={5}>
              {districts.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
