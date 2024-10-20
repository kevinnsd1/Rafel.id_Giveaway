import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Rainbow from "../../assets/rainbow.png";

export default function FormPayment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState(null);
  const [order_Id, setOrder_Id] = useState(localStorage.getItem("order_id")); // Ambil order_id dari localStorage jika tersedia
  const [orderDetails, setOrderDetails] = useState(null); // State untuk menyimpan detail pesanan

  // Mengambil midtrans_token dari state atau localStorage
  const midtransToken =
    state?.midtransToken || localStorage.getItem("midtrans_token");

  // Fungsi untuk memulai pembayaran menggunakan Snap Midtrans
  const handleSnapPayment = () => {
    if (midtransToken) {
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      const scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      scriptTag.setAttribute(
        "data-client-key",
        import.meta.env.VITE_MIDTRANS_CLIENT_KEY
      );
      document.body.appendChild(scriptTag);

      scriptTag.onload = () => {
        window.snap.pay(midtransToken, {
          onSuccess: function (result) {
            console.log("Pembayaran berhasil:", result);
            const { order_id } = result; // Mengambil order_id dari hasil pembayaran
            localStorage.setItem("order_id", order_id); // Simpan order_id ke localStorage
            setOrder_Id(order_id); // Set order_id ke state
            navigate("/payment-success", { state: { result, order_id } });
          },
          onPending: function (result) {
            console.log("Pembayaran pending:", result);
          },
          onError: function (result) {
            setError("Pembayaran gagal. Silakan coba lagi.");
            console.error("Pembayaran error:", result);
          },
          onClose: function () {
            setError("Anda menutup halaman pembayaran.");
          },
        });
      };

      scriptTag.onerror = () => {
        setError("Gagal memuat skrip pembayaran. Silakan refresh halaman.");
      };
    } else {
      setError("Token pembayaran tidak ditemukan.");
    }
  };

  // Mengambil detail order menggunakan order_id dari localStorage
  useEffect(() => {
    const storedOrderId = localStorage.getItem("order_id");
    if (storedOrderId) {
      setOrder_Id(storedOrderId); // Simpan order_id dari localStorage ke state
    }
  }, []);

  // Memanggil API untuk mendapatkan detail order ketika order_Id tersedia
  useEffect(() => {
    if (order_Id) {
      console.log("Order ID available:", order_Id); // Log order_Id sebelum fetch
      const fetchOrderDetails = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL_FANCHECK}/${order_Id}`
          );

          console.log("Fetch response status:", response.status); // Log status response

          if (response.ok) {
            const data = await response.json();
            setOrderDetails(data); // Simpan detail order yang diambil dari API
            console.log("Order details:", data); // Log hasil API untuk verifikasi
          } else {
            setError("Gagal mendapatkan detail order.");
            console.error("Fetch failed, status:", response.status);
          }
        } catch (error) {
          console.error("Fetch error:", error); // Log error untuk debugging
          setError("Terjadi kesalahan saat memuat detail order.");
        }
      };

      fetchOrderDetails(); // Memanggil API untuk mendapatkan detail order
    } else {
      setError("Order ID tidak ditemukan");
      console.error("Order ID tidak ditemukan");
    }
  }, [order_Id]); // Memicu fetch ketika order_Id telah di-set

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center top-0 fixed z-50">
        <button className="text-2xl" onClick={() => navigate("/home")}>
          ←
        </button>
        <h1 className="flex-grow text-center text-lg font-bold font-mono">
          Rafel.id
        </h1>
      </header>

      <div className="h-16"></div>

      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center mt-8">
        <img src={Rainbow} alt="Rainbow" className="w-45 h-40 mb-4" />
        <h2 className="font-bold font-mono text-lg mb-4">
          Selamat Biodata Kamu Sudah Tersimpan !!!!
        </h2>
        <p className="text-sm font-mono mb-6">
          Selamat biodata kamu sudah lengkap dan akan digunakan untuk
          mengirimkan giveaway apabila kamu beruntung mendapatkan nya. Tinggal
          satu langkah lagi untuk kamu bisa masuk daftar giveaway ini yaitu kamu
          harus membeli tiket giveaway ini{" "}
          <span className="font-bold">seharga 10rb</span> dengan metode
          pembayaran favorit kamu silahkan klik lanjut beli tiket.
        </p>

        {/* Tampilkan pesan error jika ada */}
        {error && <p className="text-red-500">{error}</p>}

        <Button
          className="bg-cyan-500 text-black py-2 px-20 rounded hover:bg-cyan-600 font-mono"
          onClick={handleSnapPayment}
        >
          Beli Tiket
        </Button>

        {!midtransToken && (
          <Button
            className="bg-cyan-500 text-black py-2 px-20 rounded hover:bg-cyan-600 font-mono mt-4"
            onClick={() => navigate("/payment-success")}
          >
            Kembali ke Beranda
          </Button>
        )}
      </div>
    </div>
  );
}
