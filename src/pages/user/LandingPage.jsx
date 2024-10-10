import React from "react";
import { useNavigate } from "react-router-dom";
import ImageCard from "../../components/ImageCard"; // Sesuaikan jalurnya
import Button from "../../components/Button"; // Sesuaikan jalurnya

import gift from "../../assets/gift1.png"; // Sesuaikan jalurnya

function LandingPage() {
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi halaman

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 text-center md:space-y-6">
        <img
          src={gift}
          alt="Gift"
          className="w-[150px] h-[100px] object-cover "
        />
        <h1 className="text-[32px] font-bold font-mono md:text-5xl">
          Rafel.id
        </h1>
        <p className="text-gray-600 max-w-md md:max-w-2xl font-mono">
          "Rafel adalah platform yang dirancang untuk memudahkan para kreator
          untuk melakukan giveaway pada penggemarnya, dan untuk para fans kalian
          bisa langsung ikuti giveaway dari kreator yang kalian suka. Ayo buruan
          ikutan!!!"
        </p>
      </div>

      {/* Giveaway Items Section */}
      <div className="grid grid-cols-3 gap-4 items-center max-w-md">
        {[...Array(6)].map((_, index) => (
          <ImageCard
            key={index}
            imageUrl="https://via.placeholder.com/150" // Ganti dengan URL gambar yang sesuai
          >
            <h3 className="text-lg font-bold font-mono">Item {index + 1}</h3>
          </ImageCard>
        ))}
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col space-y-4 items-center w-full max-w-md ">
        <Button
          onClick={() => navigate("/home")} // Navigasi ke halaman form
          className="py-2 px-8 bg-cyan-500 text-white hover:bg-blue-600 w-full font-mono"
        >
          Ikuti Giveaway
        </Button>
        <Button
          onClick={() => navigate("/creator-login")} // Navigasi ke halaman login kreator
          className="border-2 bg-white border-black py-2 px-8 hover:bg-gray-100 w-full font-mono"
        >
          Masuk Sebagai Kreator
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
