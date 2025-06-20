import { Calendar, MapPin, Users, Star } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "July 15, 2025",
    location: "Central Park",
    attendees: 2500,
    rating: 4.8,
    category: "Music",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    price: "$75",
    featured: true
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    date: "August 3, 2025",
    location: "Convention Center",
    attendees: 1200,
    rating: 4.9,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    price: "$120",
    featured: false
  },
  {
    id: 3,
    title: "Art & Culture Expo",
    date: "August 20, 2025",
    location: "Museum District",
    attendees: 800,
    rating: 4.7,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    price: "$45",
    featured: true
  },
  {
    id: 4,
    title: "Food & Wine Festival",
    date: "September 10, 2025",
    location: "Waterfront Plaza",
    attendees: 3000,
    rating: 4.6,
    category: "Food",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    price: "$85",
    featured: false
  }
];

const categoryColors = {
  Music: "from-purple-500 to-pink-500",
  Technology: "from-blue-500 to-cyan-500",
  Arts: "from-green-500 to-teal-500",
  Food: "from-orange-500 to-red-500"
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4 animate-pulse">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Immerse yourself in unforgettable experiences and connect with like-minded people
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="group cursor-pointer" onClick={() => window.location.href = `/event/${event.id}`}>
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 transition-transform duration-500 hover:scale-105 ${event.featured ? 'ring-2 ring-purple-400/30' : ''}`}>
                  
                  {/* Featured Badge */}
                  {event.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className={`bg-gradient-to-r ${categoryColors[event.category]} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {event.category}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-2xl font-bold text-lg">
                        {event.price}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {event.title}
                    </h2>
                    <div className="space-y-2 mb-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-purple-400" />
                        {event.attendees.toLocaleString()} attending
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(event.rating) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <span className="text-gray-300 text-sm ml-2">{event.rating}</span>
                      </div>
                      <div className="text-purple-400 transform transition-transform group-hover:translate-x-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform transition-all hover:scale-105 hover:shadow-lg">
            Explore More Events
          </button>
        </div>
      </div>
    </div>
  );
}
