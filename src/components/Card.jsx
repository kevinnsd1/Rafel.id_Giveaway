import React from "react";

const Card = ({
  bag,
  title,
  creatorName,
  timeRemaining,
  handleFollowClick,
}) => {
  return (
    <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4 flex items-center space-x-4 relative">
      {/* Image Section */}
      <img src={bag} alt="Tas" className="w-[120px] h-[120px] object-contain" />

      {/* Content Section */}
      <div className="ml-4 mr-8">
        <h2 className="font-mono font-bold text-lg">{creatorName}</h2>{" "}
        {/* Nama kreator dari props */}
        <p className="text-sm">{title}</p> {/* Title dari props */}
        <p className="text-sm mt-2">Berakhir dalam :</p>
        <p className="text-lg font-mono">{timeRemaining}</p>{" "}
        {/* Waktu tersisa dari props */}
      </div>

      {/* Button Ikuti */}
      <div className="absolute bottom-5 right-3 space-y-2">
        <button
          onClick={handleFollowClick}
          className="bg-cyan-400 text-black py-1 px-1 text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Ikuti
        </button>
      </div>
    </div>
  );
};

export default Card;
