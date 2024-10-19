import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import AlertLogin from "../../components/AlertLogin";
import AlertPenggemar from "../../components/AlertPenggemar";
import Door from "../../assets/pintu.png";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertPenggemar, setShowAlertPenggemar] = useState(false); // State untuk AlertPenggemar
  const [isLoading, setIsLoading] = useState(false); // State untuk melacak proses login

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    setIsLoading(true); // Set state ke loading saat proses login dimulai
    setError(""); // Reset pesan error

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL_LOGIN, // Menggunakan environment variable VITE_API_URL_LOGIN
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status) {
          // Simpan token dan username ke localStorage setelah login berhasil
          localStorage.setItem("token", data.token); // Simpan token
          localStorage.setItem("username", username); // Simpan username

          setShowAlert(true); // Tampilkan alert sukses
          setTimeout(() => {
            setShowAlert(false);
            navigate("/HomePageAdmin"); // Navigasi ke halaman admin setelah login sukses
          }, 2000);
        } else {
          setError("Login gagal, silakan periksa Username dan Password Anda.");
        }
      } else {
        setError("Login gagal, silakan periksa Username dan Password Anda.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false); // Set state loading ke false setelah proses selesai
    }
  };

  // Function to handle confirm action from AlertPenggemar
  const handleConfirmPenggemar = () => {
    setShowAlertPenggemar(false);
    navigate("/home");
  };

  // Function to handle cancel action from AlertPenggemar
  const handleCancelPenggemar = () => {
    setShowAlertPenggemar(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 z-50">
        <h1
          className="text-xl font-mono font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          ←
        </h1>
        <button
          className="text-sm font-mono"
          onClick={() => setShowAlertPenggemar(true)}
        >
          Masuk penggemar
        </button>
      </header>

      <div className="flex flex-col items-center justify-center w-full pt-24">
        <img src={Door} alt="Logo" className="mb-4 w-30 h-30" />
        <h1 className="text-3xl font-bold mb-2 text-gray-800 font-mono">
          Rafel.id
        </h1>
        <p className="mb-6 text-gray-600 text-lg font-mono">Login</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="text-left mb-4 w-80">
          <label className="block text-sm font-medium mb-2 font-mono">
            Username:
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-500 rounded-md bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="text-left mb-4 w-80">
          <label className="block text-sm font-medium mb-2 font-mono">
            Password:
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-2 border border-gray-500 rounded-md bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-800 font-mono cursor-pointer mb-4">
          Lupa Password
        </p>

        <Button
          onClick={handleLogin}
          className={`w-80 ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-cyan-500"
          } text-white font-bold py-2 rounded border-2 border-black shadow-brutalism mt-2 text-sm font-mono`}
          disabled={isLoading} // Nonaktifkan tombol jika sedang loading
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>

        <Button
          onClick={() => navigate("/Register")}
          className="w-80 mt-4 bg-transparent text-black font-bold py-2 rounded border-2 border-black shadow-brutalism text-sm font-mono"
        >
          Daftarkan akunmu
        </Button>
      </div>

      {showAlert && <AlertLogin message="Login berhasil!" statusCode={204} />}

      {showAlertPenggemar && (
        <AlertPenggemar
          message="Apakah Anda yakin ingin masuk sebagai penggemar?"
          onConfirm={handleConfirmPenggemar}
          onCancel={handleCancelPenggemar}
        />
      )}
    </div>
  );
};

export default LoginPage;
