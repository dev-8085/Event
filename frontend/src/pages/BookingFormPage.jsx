import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookingFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", tickets: 1 });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Normally you'd POST this to backend
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Book Your Tickets</h2>
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full mb-4 p-2 rounded bg-gray-100" required />
        <input name="email" onChange={handleChange} placeholder="Email" className="w-full mb-4 p-2 rounded bg-gray-100" required />
        <input name="phone" onChange={handleChange} placeholder="Phone" className="w-full mb-4 p-2 rounded bg-gray-100" required />
        <input name="tickets" type="number" min="1" onChange={handleChange} value={formData.tickets} className="w-full mb-4 p-2 rounded bg-gray-100" required />
        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-full">Confirm Booking</button>
      </form>
    </div>
  );
}
