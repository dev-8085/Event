import { useParams, useNavigate } from "react-router-dom";
import events from "../data/Events";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  if (!event) return <div className="text-white">Event not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <img src={event.image} alt={event.title} className="w-full max-h-[500px] object-cover rounded-2xl" />
      <h2 className="text-3xl font-bold mt-4">{event.title}</h2>
      <p className="text-gray-300 mt-2">{event.date}</p>
      <p className="mt-4 text-lg">{event.description}</p>
      <button
        onClick={() => navigate(`/book/${event.id}`)}
        className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700"
      >
        Book Now
      </button>
    </div>
  );
}
