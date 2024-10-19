import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"; // Pastikan path ini sesuai
import OpenGift from "../../assets/opengift.png"; // Pastikan path ini sesuai
import Bingkai from "../../assets/Bingkai.png"; // Pastikan path ini sesuai
import { AiOutlineHome, AiOutlineGift, AiOutlineLogout } from "react-icons/ai";
import AlertLogout from "../../components/AlertLogout"; // Import AlertLogout untuk konfirmasi logout
import AlertLogin from "../../components/AlertLogin"; // Import AlertLogin untuk menampilkan notifikasi sukses

const PostingHadiah = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk mengontrol sidebar
  const [judul, setJudul] = useState(""); // State untuk judul hadiah
  const [deskripsi, setDeskripsi] = useState(""); // State untuk deskripsi hadiah
  const [showLogoutAlert, setShowLogoutAlert] = useState(false); // State untuk menampilkan AlertLogout
  const [file, setFile] = useState(null); // State untuk file yang diupload
  const [previewImage, setPreviewImage] = useState(Bingkai); // State untuk preview gambar
  const [username, setUsername] = useState(""); // State untuk menyimpan username
  const [loading, setLoading] = useState(false); // State untuk menampilkan loading
  const [error, setError] = useState(null); // State untuk menampilkan error jika ada
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State untuk alert sukses
  const [postedData, setPostedData] = useState(null); // State untuk menyimpan data hadiah yang diposting
  const navigate = useNavigate(); // Untuk navigasi

  const API_URL = import.meta.env.VITE_API_URL_CREATEGIVEAWAY; // Ganti dengan URL API yang sesuai

  useEffect(() => {
    // Ambil username dari localStorage ketika halaman dimuat
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Simpan username ke state
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Fungsi untuk membuka dan menutup sidebar
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token"); // Ambil token dari localStorage

    // Pastikan token tersedia
    if (!token) {
      setError("Token tidak tersedia, silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    // Pastikan file gambar dipilih
    if (!file) {
      setError("Anda harus mengunggah gambar hadiah.");
      setLoading(false);
      return;
    }

    // Buat FormData untuk mengirim file dan data lainnya
    const formData = new FormData();
    formData.append("title", judul); // Tambahkan judul ke FormData
    formData.append("description", deskripsi); // Tambahkan deskripsi ke FormData
    formData.append("image", file); // Pastikan menggunakan nama field yang sesuai, dalam hal ini "image"

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token di header Authorization
        },
        body: formData, // Kirim FormData sebagai body
      });

      const data = await response.json(); // Parse response ke JSON

      if (!response.ok) {
        throw new Error(data.message || "Gagal membuat giveaway");
      }

      console.log("Giveaway created:", data);

      // Simpan data yang di-posting ke state postedData
      setPostedData({
        title: judul,
        description: deskripsi,
        image: file.name, // Simpan nama file, atau sesuaikan dengan response data
      });

      // Tampilkan alert sukses
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false); // Sembunyikan alert setelah beberapa detik
      }, 3000); // Sembunyikan setelah 3 detik

      // Reset state setelah submit sukses
      setJudul("");
      setDeskripsi("");
      setFile(null);
      setPreviewImage(Bingkai); // Kembalikan ke bingkai default setelah submit sukses
      setLoading(false);

      // Redirect atau lakukan tindakan lain setelah sukses
      navigate("/HomePageAdmin");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Mengambil file yang diupload
    if (selectedFile) {
      // Buat URL sementara untuk menampilkan gambar preview
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

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

        {/* Teks Rafel.id di tengah */}
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
        {/* Menampilkan username dari localStorage */}
        <div className="text-lg font-bold mb-1">{username || "User"}</div>
        <div className="text-sm mb-4">Kreator</div>
        <hr className="border-gray-300 mb-4" />

        {/* Menu Items */}
        <ul>
          <li className="mb-4 flex items-center">
            <AiOutlineHome className="mr-2" />
            <button
              onClick={() => navigate("/HomePageAdmin")}
              className="text-lg hover:text-gray-300"
            >
              Beranda
            </button>
          </li>
          <li className="mb-4 flex items-center">
            <AiOutlineGift className="mr-2" />
            <button
              onClick={() => navigate("/PostingGift")}
              className="text-lg hover:text-gray-300"
            >
              Hadiah Kamu
            </button>
          </li>
        </ul>

        {/* Keluar Akun */}
        <div className="absolute bottom-5 left-5 flex items-center">
          <AiOutlineLogout className="mr-2" />
          <button
            onClick={() => setShowLogoutAlert(true)} // Menjalankan fungsi handleLogout
            className="text-lg hover:text-gray-300"
          >
            Keluar akun
          </button>
        </div>
        <hr className="border-gray-300 mt-4" />
      </div>

      {/* Overlay untuk menutup sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Dialog AlertLogout */}
      {showLogoutAlert && (
        <AlertLogout
          message="Anda yakin akan keluar?"
          onConfirm={() => {
            localStorage.removeItem("token"); // Hapus token atau data autentikasi
            localStorage.removeItem("username"); // Hapus username dari localStorage
            navigate("/login"); // Redirect ke halaman login setelah logout
          }}
          onCancel={() => setShowLogoutAlert(false)} // Fungsi untuk menutup dialog tanpa logout
        />
      )}

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <main className="flex flex-col items-center space-y-8 w-full max-w-lg px-4">
          <div className="text-center">
            <img src={OpenGift} alt="Logo" className="w-24 h-24 mx-auto" />
          </div>

          <h2 className="text-2xl font-bold text-center">
            Posting Hadiah Kamu
          </h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 rounded-lg w-full flex items-center">
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange} // Fungsi untuk menangani file upload
              />
              <img
                src={previewImage}
                alt="Gambar Hadiah"
                className="w-16 h-16 object-contain cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()} // Trigger input saat gambar diklik
              />
              <div className="ml-4 w-full">
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Masukan Judul Barang"
                  className="w-full border-b-2 border-black bg-transparent focus:outline-none text-sm py-2"
                  required
                />
              </div>
            </div>

            {/* Deskripsi Input */}
            <div className="w-full mt-4">
              <label className="font-bold">Deskripsi :</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Masukan Deskripsi Barang"
                className="w-full mt-2 p-3 border-2 border-black rounded-lg focus:outline-none text-sm"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}

            {/* Alert Sukses */}
            {showSuccessAlert && (
              <AlertLogin
                message="Hadiah berhasil diposting!"
                statusCode={201} // Status sukses
              />
            )}

            {/* Tombol Posting */}
            <Button
              type="submit"
              className="bg-cyan-400 text-black py-3 w-full px-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold mt-4"
              disabled={loading}
            >
              {loading ? "Memposting..." : "Posting Hadiah"}
            </Button>
          </form>

          {/* Menampilkan data yang di-posting */}
          {postedData && (
            <div className="bg-white p-4 mt-8 w-full max-w-md border-2 border-black rounded-lg">
              <h3 className="text-lg font-bold">Data Hadiah yang Diposting:</h3>
              <p>Judul: {postedData.title}</p>
              <p>Deskripsi: {postedData.description}</p>
              <p>File Gambar: {postedData.image}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PostingHadiah;
