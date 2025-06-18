// src/components/EventCard.jsx
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Star, Clock, ArrowRight } from "lucide-react";

export default function EventCard({ event }) {
  // Format date for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const dateInfo = formatDate(event.date);
  const isPopular = event.attendees > 100;
  const isSoldOut = event.availableTickets === 0;

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Popular
        </div>
      )}

      {/* Sold Out Badge */}
      {isSoldOut && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Sold Out
        </div>
      )}

      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Date Badge on Image */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg">
          <div className="text-2xl font-bold text-gray-800">{dateInfo.day}</div>
          <div className="text-xs text-gray-600 uppercase font-semibold">{dateInfo.month}</div>
          <div className="text-xs text-gray-500">{dateInfo.weekday}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category Tag */}
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold uppercase tracking-wide">
            {event.category || 'Event'}
          </span>
          {event.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">{event.rating}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{event.date}</span>
            {event.time && (
              <>
                <Clock className="w-4 h-4 text-green-500 ml-2" />
                <span>{event.time}</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="truncate">{event.location}</span>
          </div>

          {event.attendees && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{event.attendees} attending</span>
            </div>
          )}
        </div>

        {/* Price and Availability */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            {event.price ? (
              <>
                <span className="text-2xl font-bold text-gray-800">${event.price}</span>
                <span className="text-xs text-gray-500">per ticket</span>
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">Free</span>
            )}
          </div>
          
          <div className="text-right">
            {event.availableTickets > 0 ? (
              <span className="text-sm text-green-600 font-semibold">
                {event.availableTickets} tickets left
              </span>
            ) : (
              <span className="text-sm text-red-500 font-semibold">
                Sold out
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/event/${event.id}`}
          className={`group/btn relative w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
            isSoldOut 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
          onClick={isSoldOut ? (e) => e.preventDefault() : undefined}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSoldOut ? 'Sold Out' : 'View Details'}
            {!isSoldOut && (
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            )}
          </span>
          
          {/* Animated background */}
          {!isSoldOut && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
          )}
        </Link>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    </div>
  );
}