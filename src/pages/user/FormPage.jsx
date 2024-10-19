import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import giftImage from "../../assets/gift2.png";
import { getCountdown } from "../../utils/countdown";

const FormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [giveawayData, setGiveawayData] = useState({
    giveawayId: "",
    title: "",
    creatorName: "",
    photo: "",
    description: "",
    timestamp: "",
  });

  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [winnerData, setWinnerData] = useState({
    courier: "",
    receipt: "",
    winnerName: "",
  });

  const [isFetchingWinner, setIsFetchingWinner] = useState(false); // To track if we are fetching the winner

  useEffect(() => {
    if (state) {
      const timestampFromStorage = localStorage.getItem(
        `timestamp_${state.id}`
      );
      const formattedTimestamp = timestampFromStorage
        ? new Date(timestampFromStorage).getTime()
        : new Date(state.timestamp).getTime();
      setGiveawayData({
        giveawayId: state.id,
        title: state.title,
        creatorName: state.creatorName,
        photo: state.photo,
        description: state.description,
        timestamp: formattedTimestamp,
      });
    }
  }, [state]);

  useEffect(() => {
    if (giveawayData.timestamp) {
      const endDate =
        new Date(giveawayData.timestamp).getTime() + 3 * 24 * 60 * 60 * 1000; // Adding 3 days to the timestamp
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        if (timeLeft > 0) {
          const totalSeconds = Math.floor(timeLeft / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          setCountdown({ hours, minutes, seconds });
        } else {
          clearInterval(interval);
          setCountdown({ hours: 0, minutes: 0, seconds: 0 });

          // Fetch winner data only if we are not already fetching
          if (!isFetchingWinner && !winnerData.winnerName) {
            setIsFetchingWinner(true); // Prevent multiple fetches
            fetchWinnerData();
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [giveawayData.timestamp, winnerData.winnerName, isFetchingWinner]);

 const fetchWinnerData = async () => {
   try {
     // Correctly access the Vite environment variable
     const apiURL = import.meta.env.VITE_API_URL_GETGIVEAWAYS;
     if (!apiURL || !giveawayData.giveawayId) {
       throw new Error("API URL atau Giveaway ID tidak ditemukan.");
     }

     // Make the API request
     const response = await axios.get(`${apiURL}/${giveawayData.giveawayId}`);

     // Log the response to verify the structure
     console.log("Response data:", response.data);

     const data = response.data.data; // Accessing the nested `data` object

     // Accessing the correct fields in the response
     const giveaway = data.giveaway || {};
     const fansWinner = data.fansWinner || {};

     // Update the winnerData state with the fetched information
     setWinnerData({
       courier: giveaway.courier || "Belum ada data",
       receipt: giveaway.receipt || "Belum ada data",
       winnerName: fansWinner.fullname || "Nama Pemenang Belum Ada",
     });

     setIsFetchingWinner(false); // Reset fetching state
   } catch (error) {
     console.error("Error fetching winner data:", error);
     setIsFetchingWinner(false); // Reset fetching state in case of error
   }
 };



  // Function to handle saving giveawayId to localStorage and state
  const handleParticipate = () => {
    const { giveawayId, title, creatorName, photo, description } = giveawayData;

    // Save giveawayId to localStorage
    localStorage.setItem(
      `giveaway_${giveawayId}`,
      JSON.stringify({
        giveawayId,
        title,
        creatorName,
        photo,
        description,
      })
    );

    // Navigate to the form page
    navigate("/form-name", {
      state: { giveawayId, title, creatorName, photo, description },
    });
  };

  const { title, creatorName, photo, description } = giveawayData;
  const { courier, receipt, winnerName } = winnerData;

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/home")}>
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      <div className="h-20"></div>
      <div className="mt-6 text-center mb-6">
        <p className="font-mono text-xl font-bold">
          {creatorName} lagi ngadain Giveaway nihh!!
        </p>
      </div>
      <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 rounded-lg flex items-center mb-6">
        <img
          src={photo}
          alt="Giveaway"
          className="w-[120px] h-[120px] object-contain"
        />
        <div className="ml-4 mr-8">
          <h2 className="font-mono font-bold text-lg">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-xs italic text-gray-500">
          Nama Pemenang akan muncul jika waktu sudah habis...
        </p>
        <img
          src={giftImage}
          alt="Hadiah"
          className="w-[130px] h-[130px] mx-auto mt-4"
        />
        {countdown.hours === 0 &&
        countdown.minutes === 0 &&
        countdown.seconds === 0 ? (
          <div className="text-center mt-6">
            <h2 className="text-lg font-bold">Nama Pemenang:</h2>
            <p className="text-md">{winnerName || "Tidak ada data pemenang"}</p>
            <p className="text-md">Kurir: {courier || "Belum ada data"}</p>
            <p className="text-md">Resi: {receipt || "Belum ada data"}</p>
          </div>
        ) : (
          <p className="text-4xl font-mono font-bold mt-4">
            {`${countdown.hours || 0}:${countdown.minutes || 0}:${
              countdown.seconds || 0
            }`}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500 font-mono">
          Yuk Ikutan Giveaway ini dengan Klik Tombol dibawah Ini
        </p>
      </div>
      <div className="w-full max-w-md mt-4">
        <Button
          onClick={handleParticipate} // Call the function to save giveawayId and navigate
          className="w-full py-2 bg-cyan-400 text-black text-lg font-mono font-bold border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          Isi Biodata Kamu
        </Button>
      </div>
    </div>
  );
};

export default FormPage;
