import React from "react";          
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import BookingFormPage from "./Pages/BookingFormPage";
import ConfirmationPage from "./Pages/ConfirmationPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event/:id" element={<EventDetailsPage />} />
      <Route path="/book/:id" element={<BookingFormPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
}