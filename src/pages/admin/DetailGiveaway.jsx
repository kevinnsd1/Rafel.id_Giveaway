import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import RedBag from "../../assets/bag.png"; // Default image if photo is not available
import AlertLogin from "../../components/AlertLogin"; // Import the AlertLogin component

const DetailGiveaway = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { giveaway } = state || {};

  // Ambil giveawayId dan userId dari localStorage
  const giveawayId = localStorage.getItem("giveawayId");
  const userId = localStorage.getItem("userId");

  // State untuk menyimpan data pemenang
  const [namaPemenang, setNamaPemenang] = useState("");
  const [noTelpon, setNoTelpon] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState("");
  const [noResi, setNoResi] = useState("");
  const [kurir, setKurir] = useState("");

  const [showNoResi, setShowNoResi] = useState(false);
  const [showKurir, setShowKurir] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for controlling the AlertLogin visibility
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the remaining time (countdown) from 3 days after the posting date
  const calculateCountdown = (timestamp) => {
    const postDate = new Date(timestamp); // The date when the giveaway was posted
    const endDate = new Date(postDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Add 3 days to the postDate
    const now = new Date(); // Current date and time

    const timeDifference = endDate - now; // Calculate the difference between the end date and now

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Giveaway is over
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Countdown calculation for 3 days after giveaway timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(giveaway.timestamp);
      setCountdown(newCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [giveaway]);

  // Load data from localStorage when the component first renders only if giveawayId matches
  useEffect(() => {
    const storedWinnerData = localStorage.getItem(
      `winnerData_${userId}_${giveawayId}`
    );
    if (storedWinnerData && giveawayId === localStorage.getItem("giveawayId")) {
      const parsedData = JSON.parse(storedWinnerData);
      setNamaPemenang(parsedData.namaPemenang || "");
      setNoTelpon(parsedData.noTelpon || "");
      setProvinsi(parsedData.provinsi || "");
      setKabupaten(parsedData.kabupaten || "");
      setKecamatan(parsedData.kecamatan || "");
      setKelurahan(parsedData.kelurahan || "");
      setKodePos(parsedData.kodePos || "");
      setAlamatLengkap(parsedData.alamatLengkap || "");
      setNoResi(parsedData.noResi || "");
      setKurir(parsedData.kurir || "");
    }
  }, [userId, giveawayId]);

  // Function to call API to generate the winner
  const handleGeneratePemenang = async () => {
    if (
      countdown.days > 0 ||
      countdown.hours > 0 ||
      countdown.minutes > 0 ||
      countdown.seconds > 0
    ) {
      setError("Giveaway belum berakhir, tidak dapat generate pemenang.");
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_GENERATEGIVEAWAY}/${giveawayId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      const result = await response.json();

      if (result.status && result.data && result.data.fansWinner) {
        const data = result.data.fansWinner;

        const winnerData = {
          namaPemenang: data.fullname || "",
          noTelpon: data.phone || "",
          provinsi: data.provinsi || "",
          kabupaten: data.kota || "",
          kecamatan: data.kecamatan || "",
          kelurahan: data.desa || "",
          kodePos: data.kode_pos || "",
          alamatLengkap: data.alamat_lengkap || "",
          noResi: data.receipt,
        };

        setNamaPemenang(winnerData.namaPemenang);
        setNoTelpon(winnerData.noTelpon);
        setProvinsi(winnerData.provinsi);
        setKabupaten(winnerData.kabupaten);
        setKecamatan(winnerData.kecamatan);
        setKelurahan(winnerData.kelurahan);
        setKodePos(winnerData.kodePos);
        setAlamatLengkap(winnerData.alamatLengkap);
        setNoResi(winnerData.noResi);
        setKurir(kurir);

        // Save winner data to localStorage after generation
        localStorage.setItem(
          `winnerData_${userId}_${giveawayId}`,
          JSON.stringify(winnerData)
        );
      } else {
        setError("Giveaway belum 3 hari.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      setError("Terjadi kesalahan saat generate pemenang.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle updating the receipt (tracking number) and courier information
  const handleUpdatePostingan = async () => {
    if (!noResi || !kurir) {
      setError("Harap isi No Resi dan Kurir sebelum memperbarui.");
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    if (!giveawayId) {
      setError("Giveaway ID tidak ditemukan. Harap pilih giveaway yang valid.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_RECEIPT}/${giveawayId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
          body: JSON.stringify({
            giveawayId: giveawayId, // Identify the giveaway being updated
            receipt: noResi, // Send the receipt (tracking number)
            courier: kurir, // Send the courier name
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal memperbarui data, silakan coba lagi."
        );
      }

      console.log("Update successful:", result);

      // Save winner data to localStorage after successful update
      const winnerData = {
        namaPemenang,
        noTelpon,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        kodePos,
        alamatLengkap,
        noResi,
        kurir,
      };
      localStorage.setItem(
        `winnerData_${userId}_${giveawayId}`,
        JSON.stringify(winnerData)
      );

      // Set alert message and visibility
      setAlertMessage("Data berhasil diperbarui!");
      setAlertType("success");
      setAlertVisible(true);

      // Navigasi ke halaman HomePageAdmin setelah berhasil memperbarui
      setTimeout(() => {
        navigate("/HomePageAdmin");
      }, 2000); // Delay sebelum navigasi ke halaman HomePageAdmin
    } catch (error) {
      console.error("Error during update:", error);
      setError(error.message || "Terjadi kesalahan saat memperbarui data.");
      setAlertMessage("Gagal memperbarui data, silakan coba lagi.");
      setAlertType("error");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Logic to check if No Resi and Kurir have been filled
  const isReadyToUpdate = noResi && kurir;

  if (!giveawayId) {
    return <div>No giveaway ID available.</div>; // Handle missing giveawayId
  }

  return (
    <div className="min-h-screen bg-white font-mono flex flex-col items-center p-4">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/HomePageAdmin")}>
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      <div className="w-full max-w-md mt-20">
        <h1 className="text-xl font-bold text-center mb-4">
          Hadiah yang kamu posting
        </h1>
        <h2 className="text-lg text-center text-gray-600 mb-6">
          Pemenang Giveaway
        </h2>

        {/* Jika alert visible, tampilkan AlertLogin */}
        {alertVisible && (
          <AlertLogin
            message={alertMessage}
            statusCode={alertType === "success" ? 204 : 400}
            onClose={() => setAlertVisible(false)} // Function to close the alert
          />
        )}

        <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 rounded-lg mb-6">
          <div className="flex flex-row items-start w-full">
            {/* Bagian gambar */}
            <div className="flex-shrink-0 w-1/4 p-1">
              <img
                src={giveaway?.photo || RedBag}
                alt={giveaway?.title || "Gambar Hadiah"}
                className="w-full"
              />
            </div>

            {/* Bagian konten */}
            <div className="flex-1 ml-4 text-left">
              <h3 className="font-bold text-lg mb-2">
                {giveaway?.title || "Nama Hadiah"}
              </h3>

              <div className="flex flex-col justify-between text-sm mt-2 space-y-2">
                <div>
                  <p className="text-gray-600">Berakhir dalam:</p>
                  <p className="text-lg font-bold">
                    {countdown.days === 0 &&
                    countdown.hours === 0 &&
                    countdown.minutes === 0 &&
                    countdown.seconds === 0
                      ? "Selesai"
                      : `${countdown.days} Hari ${countdown.hours}:${countdown.minutes}:${countdown.seconds}` ||
                        "00:00:00"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Fans:</p>
                  <p className="text-lg font-bold">
                    {giveaway?.totalfans || 0}
                  </p>
                </div>
              </div>
              <Button
                className="mt-4 bg-blue-500 text-white py-1 px-3 text-base rounded"
                onClick={handleGeneratePemenang}
                disabled={
                  loading ||
                  countdown.days > 0 ||
                  countdown.hours > 0 ||
                  countdown.minutes > 0 ||
                  countdown.seconds > 0
                }
              >
                {loading ? "Loading..." : "Generate pemenang"}
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </div>

        {/* Tampilkan form yang terisi otomatis dengan data pemenang */}
        <div className="mt-6 text-sm space-y-2 w-full">
          <div className="flex justify-between">
            <span>Nama Pemenang:</span>
            <textarea
              value={namaPemenang}
              onChange={(e) => setNamaPemenang(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan nama pemenang"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>No Telpon:</span>
            <textarea
              value={noTelpon}
              onChange={(e) => setNoTelpon(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan no telpon"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Provinsi:</span>
            <textarea
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan provinsi"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Kabupaten/Kota:</span>
            <textarea
              value={kabupaten}
              onChange={(e) => setKabupaten(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan kabupaten/kota"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Kecamatan:</span>
            <textarea
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan kecamatan"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Desa/Kelurahan:</span>
            <textarea
              value={kelurahan}
              onChange={(e) => setKelurahan(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan desa/kelurahan"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Kode Pos:</span>
            <textarea
              value={kodePos}
              onChange={(e) => setKodePos(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan kode pos"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Alamat Lengkap:</span>
            <textarea
              value={alamatLengkap}
              onChange={(e) => setAlamatLengkap(e.target.value)}
              className="border border-gray-400 w-48 px-2 py-1"
              placeholder="Masukkan alamat lengkap"
              disabled={
                countdown.days > 0 ||
                countdown.hours > 0 ||
                countdown.minutes > 0 ||
                countdown.seconds > 0
              }
            />
          </div>

          {/* Tombol tambah untuk "No Resi" */}
          {!showNoResi && (
            <div className="mt-4">
              <Button
                onClick={() => setShowNoResi(true)}
                className="bg-green-500 text-white w-full rounded"
                disabled={
                  countdown.days > 0 ||
                  countdown.hours > 0 ||
                  countdown.minutes > 0 ||
                  countdown.seconds > 0
                }
              >
                Tambah No Resi
              </Button>
            </div>
          )}
          {showNoResi && (
            <div className="flex justify-between mt-2">
              <span>No Resi:</span>
              <textarea
                value={noResi}
                onChange={(e) => setNoResi(e.target.value)}
                className="border border-gray-400 w-48 px-2 py-1"
                placeholder="Masukkan No Resi"
                disabled={
                  countdown.days > 0 ||
                  countdown.hours > 0 ||
                  countdown.minutes > 0 ||
                  countdown.seconds > 0
                }
              />
            </div>
          )}

          {/* Tombol tambah untuk "Kurir" */}
          {!showKurir && (
            <div className="mt-4">
              <Button
                onClick={() => setShowKurir(true)}
                className="bg-green-500 text-white w-full rounded"
                disabled={
                  countdown.days > 0 ||
                  countdown.hours > 0 ||
                  countdown.minutes > 0 ||
                  countdown.seconds > 0
                }
              >
                Tambah Kurir
              </Button>
            </div>
          )}

          {showKurir && (
            <div className="flex justify-between mt-2">
              <span>Kurir:</span>
              <textarea
                value={kurir}
                onChange={(e) => setKurir(e.target.value)}
                className="border border-gray-400 w-48 px-2 py-1"
                placeholder="Masukkan Kurir"
                disabled={
                  countdown.days > 0 ||
                  countdown.hours > 0 ||
                  countdown.minutes > 0 ||
                  countdown.seconds > 0
                }
              />
            </div>
          )}

          {/* Button Update Postingan */}
          <div className="mt-8 text-center">
            <Button
              className={`w-full py-2 px-4 rounded ${
                isReadyToUpdate ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={handleUpdatePostingan}
              disabled={!isReadyToUpdate}
            >
              Update Postingan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGiveaway;
