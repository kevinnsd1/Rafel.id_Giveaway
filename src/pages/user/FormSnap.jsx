import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";

export default function FormSnap() {
  const { state } = useLocation(); // Mengambil token Midtrans dari state yang diteruskan
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const midtransToken = state?.midtransToken || null; // Mengambil token dari state

  useEffect(() => {
    if (midtransToken) {
      // Load Midtrans Snap script
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      const scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      scriptTag.setAttribute(
        "data-client-key",
        import.meta.env.VITE_MIDTRANS_CLIENT_KEY
      ); // Client key Midtrans Anda
      document.body.appendChild(scriptTag);

      scriptTag.onload = () => {
        window.snap.pay(midtransToken, {
          onSuccess: function (result) {
            // Handle success result
            console.log("Pembayaran berhasil:", result);
            navigate("/payment-success", { state: { result } });
          },
          onPending: function (result) {
            // Handle pending result
            console.log("Pembayaran pending:", result);
          },
          onError: function (result) {
            // Handle error result
            setError("Pembayaran gagal. Silakan coba lagi.");
            console.error("Pembayaran error:", result);
          },
          onClose: function () {
            setError("Anda menutup halaman pembayaran.");
          },
        });
      };

      scriptTag.onerror = () => {
        setError("Gagal memuat script pembayaran. Silakan refresh halaman.");
      };
    } else {
      setError("Token pembayaran tidak ditemukan.");
    }
  }, [midtransToken, navigate]);

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

      <div className="flex-grow flex flex-col justify-center items-center">
        <h2 className="font-bold font-mono text-lg mb-4">Proses Pembayaran</h2>
        <p className="text-sm font-mono mb-6">
          Mohon tunggu, halaman pembayaran sedang dimuat...
        </p>

        {error && <p className="text-red-500">{error}</p>}

        {!midtransToken && (
          <Button
            className="bg-cyan-500 text-black py-2 px-20 rounded hover:bg-cyan-600 font-mono"
            onClick={() => navigate("/home")}
          >
            Kembali ke Beranda
          </Button>
        )}
      </div>
    </div>
  );
}
