import React, { useState } from 'react';

function Navbar() {
  // State untuk menampilkan/menyembunyikan sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="font-mono">
      {/* Navbar */}
      <nav className="bg-white px-4 py-2 flex justify-between items-center shadow-md">
        {/* Hamburger Icon */}
        <button
          className="text-gray-700 focus:outline-none"
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
        <div className="text-lg font-bold">Rafel.id</div>
        <div className="text-gray-600">Masuk Penggemar</div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 w-64 p-5 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="text-2xl mb-4">Sidebar Menu</div>
        <ul>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Contact
            </a>
          </li>
        </ul>
        {/* Close Sidebar Button */}
        <button
          className="mt-4 text-gray-300 hover:text-white"
          onClick={toggleSidebar}
        >
          Close Sidebar
        </button>
      </div>

      {/* Overlay untuk menutup sidebar saat di luar sidebar diklik */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
