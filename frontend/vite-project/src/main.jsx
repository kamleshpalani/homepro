// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Book from "./pages/Book.jsx";

// Cleaner pages
import CleanerApply from "./pages/CleanerApply.jsx";
import CleanerLogin from "./pages/CleanerLogin.jsx";

// Customer Account pages
import Signup from "./pages/Signup.jsx";
import CustomerLogin from "./pages/CustomerLogin.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Admin pages
import Bookings from "./pages/Bookings.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Cleaners from "./pages/Cleaners.jsx";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />

        {/* Cleaner Pages */}
        <Route path="/cleaner/login" element={<CleanerLogin />} />
        <Route path="/cleaner/apply" element={<CleanerApply />} />
        <Route path="/cleaners/apply" element={<CleanerApply />} />

        {/* Customer Account Pages */}
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/login" element={<CustomerLogin />} />
        <Route path="/account/dashboard" element={<Dashboard />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/cleaners" element={<Cleaners />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
