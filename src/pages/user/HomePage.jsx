import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import mario from "../../assets/mario.png";
import bag from "../../assets/bag.png";
import Button from "../../components/Button";
import Alert from "../../components/Alert"; // Import komponen Alert

const HomePage = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false); // State untuk mengontrol visibilitas alert

  const handleCreatorLogin = () => {
    // Jika user belum login, tampilkan alert
    setShowAlert(true);
  };

  const handleFollowClick = () => {
    // Navigasi ke halaman form
    navigate("/form");
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleRegister = () => {
    navigate("/register"); // Arahkan ke halaman register
    setShowAlert(false);
  };

  const handleLogin = () => {
    navigate("/login"); // Arahkan ke halaman login
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 absolute">
        <h1 className="text-xl font-mono font-bold">Rafel.id</h1>
        <button
          className="text-sm font-mono"
          onClick={handleCreatorLogin} // Gunakan handleCreatorLogin untuk menampilkan alert
        >
          Masuk Kreator
        </button>
      </header>

      {/* Main Section */}
      <main className="mt-20 flex flex-col items-center space-y-8 w-full max-w-lg">
        {/* Bagian Pengantar */}
        <div className="flex items-center space-x-4">
          <img
            src={mario}
            alt="Giveaway Icon"
            className="w-32 h-30 mr-1 object-contain"
          />
          <p className="text-lg font-bold font-mono flex-grow min-w-0">
            Ayo Ikutin Giveaway Dari Kreator Yang Kamu Sukai!!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full fixed">
          <input
            type="text"
            placeholder="Cari Giveaway"
            className="w-full border-2 font-mono border-black px-4 py-2 text-center text-sm rounded-lg focus:outline-none"
          />
          <p className="mt-8 w-full text-center font-mono text-lg">
            Giveaway sedang berlangsung
          </p>
        </div>

        {/* Giveaway List with Scroll */}
        <div className="overflow-y-scroll max-h-80 w-full space-y-7">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 rounded-lg flex items-center mb-6"
            >
              {/* Image Section */}
              <img
                src={bag}
                alt="Tas"
                className="w-[120px] h-[120px] object-contain"
              />

              {/* Content Section */}
              <div className="ml-4 mr-8">
                <h2 className="font-mono font-bold text-lg">Nagita Slavina</h2>
                <p className="text-sm">Tas Luis Vuitton</p>
                <p className="text-sm mt-2">Berakhir dalam :</p>
                <p className="text-lg font-mono">15:20:20</p>
              </div>

              {/* Button Ikuti */}
              <div className="absolute rounded-xl bottom-5 right-3 mr-1">
                <Button
                  onClick={handleFollowClick} // Panggil handleFollowClick untuk navigasi ke halaman /form
                  className="bg-cyan-400 text-black py-1 px-1 text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Ikuti
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Tampilkan Alert jika showAlert true */}
      {showAlert && (
        <Alert
          onClose={handleAlertClose}
          onRegister={handleRegister}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default HomePage;
