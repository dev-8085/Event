import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-56 object-cover transition duration-300 hover:brightness-90"
      />
      <div className="p-5 space-y-2">
        <h3 className="text-2xl font-semibold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500">{new Date(event.date).toDateString()}</p>
        <p className="text-gray-700 line-clamp-2">{event.description}</p>
        <Link
          to={`/event/${event.id}`}
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
