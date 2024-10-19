import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/LandingPage";
import HomePage from "./pages/user/HomePage";
import FormPage from "./pages/user/FormPage";
import FormDonePage from "./pages/user/FormDonePage";
import FormName from "./pages/user/FormName";
import FormNoTelp from "./pages/user/FormNoTelp";
import FormProvince from "./pages/user/FormProvince";
import FormCity from "./pages/user/FormCity";
import FormSubdistrict from "./pages/user/Formsubdistrict";
import FormDistrict from "./pages/user/FormDistrict";
import FormPoscode from "./pages/user/FormPoscode";
import FormAddress from "./pages/user/FormAddress";
import FormPayment from "./pages/user/FormPayment";
import PaymentSuccess from "./pages/user/PaymentSucces";
import LoginPage from "./pages/admin/LoginPage"
import RegisterPage from "./pages/admin/RegisterPage";
import HomePageAdmin from "./pages/admin/HomePageAdmin"
import PostingGift from "./pages/admin/PostingHadiah"
import DetailGiveaway from "./pages/admin/DetailGiveaway"
import FormSnap from "./pages/user/FormSnap";
import FormSnap from "./pages/user/FormSnap";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/form-done" element={<FormDonePage />} />
        <Route path="/form-name" element={<FormName />} />
        <Route path="/form-phone" element={<FormNoTelp />} />
        <Route path="/form-province" element={<FormProvince />} />
        <Route path="/form-city" element={<FormCity />} />
        <Route path="/form-subdistrict" element={<FormSubdistrict />} />
        <Route path="/form-district" element={<FormDistrict />} />
        <Route path="/form-poscode" element={<FormPoscode />} />
        <Route path="/form-address" element={<FormAddress />} />
        <Route path="/form-payment" element={<FormPayment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/form-snap" element={<FormSnap />} />

        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
        <Route path="/PostingGift" element={<PostingGift />} />
        <Route path="/DetailGiveaway/:id" element={<DetailGiveaway />} />
      </Routes>
    </Router>
  );
};

export default App;
