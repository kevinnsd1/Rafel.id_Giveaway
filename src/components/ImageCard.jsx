import React from "react";
import bag from "../assets/gift2.png"

export default function BagCard({ imageUrl }) {
  return (
    <div className="relative w-[96px] h-[96px] bg-cyan-300 rounded-lg p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
      {/* Shadow Layer */}
      <img
        src={bag}
        alt="Bag"
        className="w-[100px] h-[61px] object-contain"
      />
      <div className="absolute -bottom-3 -right-3 w-full h-full"></div>

      {/* Content Layer */}
    </div>
  );
}
