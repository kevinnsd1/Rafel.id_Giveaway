import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineGift, AiOutlineLogout } from "react-icons/ai";
import AlertLogout from "../../components/AlertLogout"; // Import komponen AlertLogout
import mario from "../../assets/mario.png";

const HomePageAdmin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [giveaways, setGiveaways] = useState([]); // State untuk menyimpan data giveaway dari API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menangani pencarian
  const [isNewUser, setIsNewUser] = useState(false); // State untuk memeriksa apakah pengguna baru

  // Ambil username dari localStorage ketika halaman dimuat
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const newUserFlag = localStorage.getItem("isNewUser");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (newUserFlag === "true") {
      setIsNewUser(true);
      localStorage.removeItem("isNewUser"); // Hapus flag pengguna baru setelah menampilkan pesan
    }
  }, []);

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

  // Ambil data giveaways dari API
  const fetchGiveaways = async () => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); // Ambil username dari localStorage
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_GETGIVEAWAYSCREATOR}/${storedUsername}`, // API URL dari .env
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      // Cek apakah data creator dan giveaways ada di dalam respons
      if (
        data &&
        data.data &&
        data.data.creator &&
        data.data.creator.giveaways
      ) {
        // Filter giveaways berdasarkan username yang login
        const filteredGiveaways = data.data.creator.giveaways.filter(
          (giveaway) => data.data.creator.username === storedUsername
        );

        // Initialize countdown for each giveaway
        const giveawaysWithCountdown = filteredGiveaways.map((giveaway) => ({
          ...giveaway,
          countdown: calculateCountdown(giveaway.timestamp), // Initialize countdown
        }));

        setGiveaways(giveawaysWithCountdown); // Simpan data giveaway yang sesuai ke state
      } else {
        setError("Tidak Ada Giveaway yang aktif");
      }
    } catch (error) {
      console.error("Error fetching giveaways:", error);
      setError("Gagal mengambil data giveaway");
    } finally {
      setLoading(false); // Menyelesaikan loading
    }
  };

  // Ambil data giveaways ketika halaman pertama kali dibuka
  useEffect(() => {
    fetchGiveaways();
  }, []);

  // Fungsi untuk menangani klik detail dan simpan giveawayId ke localStorage
  const handleDetailClick = (giveaway) => {
    // Simpan giveawayId ke localStorage
    localStorage.setItem("giveawayId", giveaway.id);

    // Arahkan pengguna ke halaman detail giveaway
    navigate(`/DetailGiveaway/${giveaway.id}`, { state: { giveaway } });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("giveawayId"); // Hapus giveawayId saat logout
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to update countdowns
  const updateCountdowns = () => {
    setGiveaways((prevGiveaways) =>
      prevGiveaways.map((giveaway) => ({
        ...giveaway,
        countdown: calculateCountdown(giveaway.timestamp), // Update countdown
      }))
    );
  };

  useEffect(() => {
    // Update countdowns every second
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [giveaways]);

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Navbar */}
      <nav className="bg-white px-4 py-2 flex justify-between items-center shadow-md w-full fixed top-0 z-10">
        <button
          className="text-black focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="flex-grow text-center">
          <div className="text-lg font-bold text-black">Rafel.id</div>
        </div>
        <div className="w-6"></div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-cyan-500 w-64 p-5 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="text-lg font-bold mb-1">{username || "User"}</div>
        <div className="text-sm mb-4">Kreator</div>
        <hr className="border-gray-300 mb-4" />
        <ul>
          <li className="mb-4 flex items-center">
            <AiOutlineHome className="mr-2" />
            <button
              onClick={() => handleNavigation("/HomePageAdmin")}
              className="text-lg hover:text-gray-300"
            >
              Beranda
            </button>
          </li>
          <li className="mb-4 flex items-center">
            <AiOutlineGift className="mr-2" />
            <button
              onClick={() => handleNavigation("/PostingGift")}
              className="text-lg hover:text-gray-300"
            >
              Posting Hadiah
            </button>
          </li>
        </ul>
        <div className="absolute bottom-5 left-5 flex items-center">
          <AiOutlineLogout className="mr-2" />
          <button
            onClick={handleLogout}
            className="text-lg hover:text-gray-300"
          >
            Keluar akun
          </button>
        </div>
        <hr className="border-gray-300 mt-4" />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {showLogoutAlert && (
        <AlertLogout
          message="Anda yakin akan keluar?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}

      <div className="pt-20 px-6 flex flex-col items-center">
        <img src={mario} alt="Character" className="w-20 h-20" />
        <h2 className="text-xl font-bold mt-4">Hadiah Yang Kamu Posting</h2>

        {/* Tampilkan pesan untuk pengguna baru */}

        {/* Pencarian Giveaway */}
        <div className="w-full max-w-md mt-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari Giveaway"
            className="border-2 border-black w-full py-2 px-4 rounded-lg text-center"
          />
        </div>

        <h3 className="mt-6 text-lg font-bold">Giveaway kamu</h3>

        {isNewUser && (
          <div className="mt-6 bg-cyan-500 text-center p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-white-500 mb-2">
              Yuk Buat Giveaway Pertamamu!
            </h3>
            <button
              onClick={() => handleNavigation("/PostingGift")}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-cyan-600 transition"
            >
              Buat Giveaway
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 justify-items-center mt-4 max-w-4xl w-full">
          {loading ? (
            <p>Memuat data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : giveaways.length === 0 ? (
            <p>Tidak ada giveaway yang ditemukan.</p>
          ) : (
            giveaways
              .filter((giveaway) =>
                giveaway.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((giveaway) => (
                <div
                  key={giveaway.id}
                  className={`relative w-full max-w-sm transition-opacity ${
                    sidebarOpen ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 relative flex items-center mb-4 z-10">
                    <img
                      src={giveaway.photo || "https://via.placeholder.com/150"}
                      alt="Gambar Hadiah"
                      className="w-24 h-24 object-contain"
                    />
                    <div className="ml-4">
                      <h2 className="font-bold text-md">{giveaway.title}</h2>
                      <p className="text-sm mt-1">Berakhir dalam:</p>
                      <p className="text-sm font-mono mt-1">
                        {giveaway.countdown.days === 0 &&
                        giveaway.countdown.hours === 0 &&
                        giveaway.countdown.minutes === 0 &&
                        giveaway.countdown.seconds === 0
                          ? "Selesai"
                          : `${giveaway.countdown.days} Hari ${giveaway.countdown.hours}:${giveaway.countdown.minutes}:${giveaway.countdown.seconds}` ||
                            "00:00:00"}
                      </p>
                      <p className="text-sm mt-1 text-gray-600">
                        Total Fans: {giveaway.totalfans || 0}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDetailClick(giveaway)}
                      className="absolute bottom-4 right-4 bg-cyan-400 text-black py-1 px-3 text-xs rounded-lg border-2 border-black shadow-md"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageAdmin;
