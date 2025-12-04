// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Book from "./pages/Book.jsx";

// Public cleaner registration page
import CleanerApply from "./pages/CleanerApply.jsx";

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
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />

        {/* Public Cleaner Registration */}
        <Route path="/cleaners/apply" element={<CleanerApply />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/cleaners" element={<Cleaners />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
