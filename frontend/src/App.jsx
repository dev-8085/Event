import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookingFormPage from "./pages/BookingFormPage";
import ConfirmationPage from "./pages/ConfirmationPage";

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