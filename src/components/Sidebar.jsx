import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineGift,
  AiOutlineLogout,
  AiOutlineMail,
} from "react-icons/ai"; // Menggunakan react-icons

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="font-mono">
      {/* Navbar */}
      <nav className="bg-cyan-500 px-4 py-2 flex justify-between items-center shadow-md">
        {/* Menu text */}
        <div className="text-lg font-bold text-black">Menu</div>

        {/* Hamburger Icon */}
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
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-cyan-500 w-64 p-5 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Nama pengguna dan nomor telepon */}
        <div className="text-lg font-bold mb-1">Kevin Satria</div>
        <div className="text-sm mb-4">089531878050</div>
        <hr className="border-gray-300 mb-4" />

        {/* Menu Items */}
        <ul>
          <li className="mb-4 flex items-center">
            <AiOutlineHome className="mr-2" />
            <a href="#" className="text-lg hover:text-gray-300">
              Beranda
            </a>
          </li>
          <li className="mb-4 flex items-center">
            <AiOutlineGift className="mr-2" />
            <a href="#" className="text-lg hover:text-gray-300">
              Hadiah Kamu
            </a>
          </li>
          <li className="mb-4 flex items-center">
            <AiOutlineMail className="mr-2" />
            <a href="#" className="text-lg hover:text-gray-300">
              Posting Hadiah
            </a>
          </li>
        </ul>

        {/* Keluar Akun */}
        <div className="absolute bottom-5 left-5 flex items-center">
          <AiOutlineLogout className="mr-2" />
          <a href="#" className="text-lg hover:text-gray-300">
            Keluar akun
          </a>
        </div>
        <hr className="border-gray-300 mt-4" />
      </div>

      {/* Overlay saat sidebar terbuka */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
