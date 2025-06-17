import events from "../data/Events";
import EventCard from "../components/EventCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-10">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}