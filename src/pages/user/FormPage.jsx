import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import mario from "../../assets/mario.png";
import Alert from "../../components/Alert";

// Fungsi untuk menghitung countdown dalam format hari, jam, menit, detik
const getCountdown = (endDate) => {
  const now = Date.now();
  const timeLeft = endDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds
  };
};

const HomePage = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL_GETGIVEAWAYS);
        const data = await response.json();

        setGiveaways(data.data.giveaways);
        data.data.giveaways.forEach(giveaway => {
          localStorage.setItem(`timestamp_${giveaway.id}`, giveaway.timestamp);
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching giveaways:", error);
        setError("Gagal mengambil data giveaway");
        setLoading(false);
      }
    };

    fetchGiveaways();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newCountdowns = {};

      giveaways.forEach((giveaway) => {
        const storedTimestamp = localStorage.getItem(`timestamp_${giveaway.id}`);
        if (storedTimestamp) {
          const startDate = new Date(storedTimestamp).getTime();
          const endDate = startDate + (3 * 24 * 60 * 60 * 1000);
          const timeLeft = endDate - now;

          if (timeLeft > 0) {
            newCountdowns[giveaway.id] = getCountdown(endDate);
          } else {
            newCountdowns[giveaway.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [giveaways]);

  const handleCreatorLogin = () => {
    setShowAlert(true);
  };

const handleFollowClick = (giveaway) => {
  // Save the giveawayId in localStorage with a constant key "giveawayId"
  localStorage.setItem("giveawayId", giveaway.id);

  // Navigate to the form page with details
  navigate("/form", {
    state: {
      id: giveaway.id,
      title: giveaway.title,
      creatorName: giveaway.creator.username,
      photo: giveaway.photo,
      description: giveaway.description || "Tidak ada deskripsi tersedia.",
      timestamp: giveaway.timestamp,
    },
  });
};



  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setShowAlert(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setShowAlert(false);
  };

  const filteredGiveaways = giveaways.filter(
    (giveaway) =>
      giveaway.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      giveaway.creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative flex flex-col items-center p-6">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed">
        <h1 className="text-xl font-mono font-bold">Rafel.id</h1>
        <button className="text-sm font-mono" onClick={handleCreatorLogin}>
          Masuk Kreator
        </button>
      </header>

      <main className="mt-20 flex flex-col items-center space-y-8 w-full max-w-lg">
        <div className="flex items-center space-x-4">
          <img
            src={mario}
            alt="Ikon Giveaway"
            className="w-32 h-30 mr-1 object-contain"
          />
          <p className="text-lg font-bold font-mono flex-grow min-w-0">
            Ayo Ikuti Giveaway Dari Kreator Yang Kamu Sukai!!
          </p>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari Giveaway atau Kreator"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 font-mono border-black px-4 py-2 text-center text-sm rounded-lg focus:outline-none"
          />
          <p className="mt-8 w-full text-center font-mono text-lg">
            Giveaway sedang berlangsung
          </p>
        </div>

        <div className="overflow-y-scroll scrollbar-hidden max-h-80 w-full space-y-7">
          {loading ? (
            <p>Memuat data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredGiveaways.length === 0 ? (
            <p>Tidak ada giveaway yang ditemukan.</p>
          ) : (
            filteredGiveaways.map((giveaway) => (
              <div key={giveaway.id} className="mb-6">
                <Card
                  bag={giveaway.photo || "https://via.placeholder.com/150"}
                  title={giveaway.title}
                  creatorName={giveaway.creator.username}
                  timeRemaining={
                    countdowns[giveaway.id]?.days === 0 &&
                    countdowns[giveaway.id]?.hours === 0 &&
                    countdowns[giveaway.id]?.minutes === 0 &&
                    countdowns[giveaway.id]?.seconds === 0
                      ? "Selesai"
                      : `${countdowns[giveaway.id]?.days || 0} Hari ${
                          countdowns[giveaway.id]?.hours || 0
                        }:${countdowns[giveaway.id]?.minutes || 0}:${
                          countdowns[giveaway.id]?.seconds || 0
                        }`
                  }
                  handleFollowClick={() => handleFollowClick(giveaway)}
                />
              </div>
            ))
          )}
        </div>
      </main>

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
