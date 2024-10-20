import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"; // Import komponen Button
import Door from "../../assets/pintu.png";
import Alert2 from "../../components/Alert2"; // Import komponen Alert2 untuk notifikasi
import AlertPenggemar from "../../components/AlertPenggemar"; // Import komponen AlertPenggemar

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPenggemarAlert, setShowPenggemarAlert] = useState(false); // State untuk AlertPenggemar
  const [token, setToken] = useState(null); // State untuk token

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCreatorLogin = () => {
    setShowPenggemarAlert(true); // Tampilkan AlertPenggemar ketika tombol "Masuk Penggemar" ditekan
  };

  const handleLogin = () => {
    navigate("/login"); // Navigasi ke halaman login ketika tombol "Masuk akunmu" ditekan
  };

  const handleRegister = async () => {
    // Cek apakah username mengandung huruf besar
    if (username !== username.toLowerCase()) {
      setAlertMessage("Username tidak boleh mengandung huruf besar.");
      setStatusCode(400);
      setShowAlert(true);
      return;
    }

    // Cek apakah username mengandung spasi
    if (username.includes(" ")) {
      setAlertMessage("Username tidak boleh mengandung spasi.");
      setStatusCode(400);
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Password dan konfirmasi password tidak cocok.");
      setStatusCode(400);
      setShowAlert(true);
      return;
    }

    const data = {
      name: username,
      username,
      phone: phoneNumber,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      setStatusCode(response.status);

      if (response.status === 201) {
        const result = await response.json();
        const token = result.data.token; // Asumsi token berada dalam result.data.token

        // Simpan username, token, dan flag 'isNewUser' di localStorage setelah berhasil registrasi
        localStorage.setItem("username", username);
        localStorage.setItem("token", token); // Simpan token di localStorage
        localStorage.setItem("isNewUser", "true"); // Menyimpan status pengguna baru

        // Simpan token di state
        setToken(token);

        // Tampilkan alert sukses
        setAlertMessage("Registrasi berhasil. Selamat datang!");
        setShowAlert(true);

        // Redirect ke halaman HomePageAdmin setelah 2 detik
        setTimeout(() => {
          navigate("/HomePageAdmin");
        }, 2000);
      } else if (response.status === 400) {
        setAlertMessage("Akun sudah ada atau gagal mendaftarkan akun.");
        setShowAlert(true);
      } else {
        const contentType = response.headers.get("content-type");
        if (
          !response.status ||
          !contentType ||
          !contentType.includes("application/json")
        ) {
          throw new Error(
            `Server error or unexpected response type: ${response.status}`
          );
        }

        const textResponse = await response.text();
        console.log("Raw Response:", textResponse);

        let result;
        try {
          result = JSON.parse(textResponse);
        } catch (parseError) {
          throw new Error("Failed to parse JSON: " + parseError.message);
        }

        console.log("Parsed JSON Result:", result);

        if (result.status) {
          setAlertMessage("Akunmu sudah terdaftar.");
          setShowAlert(true);
        } else {
          setAlertMessage(result.message || "Registrasi gagal.");
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setAlertMessage("Terjadi kesalahan dalam melakukan registrasi.");
      setStatusCode(400);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleConfirmPenggemar = () => {
    setShowPenggemarAlert(false);
    navigate("/home"); // Navigasi ke halaman /home setelah konfirmasi
  };

  const handleCancelPenggemar = () => {
    setShowPenggemarAlert(false); // Tutup AlertPenggemar jika pengguna memilih "Tidak"
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 z-50">
        <h1
          className="text-xl font-mono font-bold cursor-pointer"
          onClick={handleBack}
        >
          ←
        </h1>
        <button className="text-sm font-mono" onClick={handleCreatorLogin}>
          Masuk Penggemar
        </button>
      </header>

      <div className="flex flex-col items-center justify-center w-full pt-24">
        <img src={Door} alt="Logo" className="mb-4 w-30 h-30" />
        <h1 className="text-3xl font-bold mb-2 text-gray-800 font-mono">
          Rafel.id
        </h1>
        <p className="mb-6 text-gray-600 text-lg font-mono">Register</p>

        {/* Form Register */}
        <div className="text-left mb-4 w-80">
          <label className="block text-sm font-medium mb-2 font-mono">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded-md bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="text-left mb-4 w-80">
          <label className="block text-sm font-medium mb-2 font-mono">
            Nomor Telepon:
          </label>
          <div className="flex items-center border border-gray-500 rounded-md bg-transparent">
            <span className="px-3 py-2 font-mono text-gray-700 border-r border-gray-500">
              +62
            </span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="text-left mb-4 w-80">
          <label className="block text-sm font-medium mb-2 font-mono">
            Kata Sandi:
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded-md bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="text-left mb-4 w-80">
          <label className="block text-sm font-medium mb-2 font-mono">
            Konfirmasi Kata Sandi:
          </label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded-md bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <Button
          className="w-80 bg-cyan-500 text-white font-bold py-2 rounded border-2 border-black shadow-brutalism mt-2 text-sm font-mono"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Sedang registrasi..." : "Daftar"}
        </Button>

        <Button
          className="w-80 mt-4 bg-transparent text-black font-bold py-2 rounded border-2 border-black shadow-brutalism text-sm font-mono"
          onClick={handleLogin} // Navigasi ke halaman login
        >
          Masuk akunmu
        </Button>
      </div>

      {/* Tampilkan alert jika showAlert bernilai true */}
      {showAlert && (
        <Alert2
          message={alertMessage}
          onClose={handleCloseAlert}
          statusCode={statusCode}
        />
      )}

      {/* Tampilkan AlertPenggemar jika showPenggemarAlert bernilai true */}
      {showPenggemarAlert && (
        <AlertPenggemar
          message="Apakah Anda yakin ingin masuk sebagai Penggemar?"
          onConfirm={handleConfirmPenggemar}
          onCancel={handleCancelPenggemar}
        />
      )}
    </div>
  );
};

export default RegisterPage;
