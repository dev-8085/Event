import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Share2, 
  Heart,
  Ticket,
  Camera,
  Music,
  Utensils,
  Car,
  Wifi,
  Shield,
  Info,
  CheckCircle,
  User,
  MessageCircle,
  ThumbsUp,
  Monitor,
  Code,
  Cpu,
  Globe,
  Database,
  Smartphone,
  Leaf,
  Heart as HeartIcon,
  GraduationCap,
  DollarSign
} from "lucide-react";
import events from "../data/events";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const event = events.find(e => e.id === id);

  // Dynamic event data based on event type
  const getEventExtras = (event) => {
    const eventTypeMap = {
      "startup": {
        tags: ["Startup", "Networking", "Business", "Venture Capital"],
        highlights: [
          "Network with 500+ entrepreneurs",
          "Pitch sessions with VCs",
          "Startup showcase area",
          "Mentorship opportunities"
        ],
        amenities: [
          { icon: Wifi, label: "Free WiFi", available: true },
          { icon: Car, label: "Parking", available: true },
          { icon: Utensils, label: "Networking Lunch", available: true },
          { icon: Camera, label: "Photography", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ]
      },
      "ai": {
        tags: ["AI", "Machine Learning", "Technology", "Innovation"],
        highlights: [
          "Live AI demonstrations",
          "Hands-on workshops",
          "Industry expert panels",
          "Open source project showcase"
        ],
        amenities: [
          { icon: Wifi, label: "High-Speed WiFi", available: true },
          { icon: Monitor, label: "Demo Stations", available: true },
          { icon: Utensils, label: "Tech Lunch", available: true },
          { icon: Camera, label: "Live Streaming", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
          "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800"
        ]
      },
      "react": {
        tags: ["React", "JavaScript", "Frontend", "Development"],
        highlights: [
          "React 19 feature deep-dive",
          "Live coding sessions",
          "Component library showcase",
          "Performance optimization tips"
        ],
        amenities: [
          { icon: Wifi, label: "Developer WiFi", available: true },
          { icon: Code, label: "Coding Stations", available: true },
          { icon: Utensils, label: "Developer Lunch", available: true },
          { icon: Monitor, label: "Multiple Screens", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
        ]
      },
      "cloud": {
        tags: ["Cloud", "AWS", "DevOps", "Infrastructure"],
        highlights: [
          "Multi-cloud strategy sessions",
          "Serverless architecture demos",
          "Cost optimization workshops",
          "Security best practices"
        ],
        amenities: [
          { icon: Wifi, label: "Enterprise WiFi", available: true },
          { icon: Database, label: "Cloud Labs", available: true },
          { icon: Utensils, label: "Business Lunch", available: true },
          { icon: Shield, label: "Security Demo", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"
        ]
      },
      "security": {
        tags: ["Cybersecurity", "Privacy", "Protection", "Enterprise"],
        highlights: [
          "Live hacking demonstrations",
          "Security audit workshops",
          "Compliance training",
          "Threat intelligence briefing"
        ],
        amenities: [
          { icon: Wifi, label: "Secure WiFi", available: true },
          { icon: Shield, label: "Security Lab", available: true },
          { icon: Utensils, label: "Secure Lunch", available: true },
          { icon: Monitor, label: "Demo Environment", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800"
        ]
      },
      "marketing": {
        tags: ["Digital Marketing", "SEO", "Content", "Growth"],
        highlights: [
          "ROI tracking strategies",
          "Social media automation",
          "Content creation workshops",
          "Analytics deep-dive"
        ],
        amenities: [
          { icon: Wifi, label: "Marketing WiFi", available: true },
          { icon: Smartphone, label: "Mobile Labs", available: true },
          { icon: Utensils, label: "Networking Lunch", available: true },
          { icon: Camera, label: "Content Creation", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800",
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
        ]
      },
      "green": {
        tags: ["Green Tech", "Sustainability", "Clean Energy", "Environment"],
        highlights: [
          "Renewable energy showcase",
          "Carbon footprint analysis",
          "Sustainable tech demos",
          "Green investment opportunities"
        ],
        amenities: [
          { icon: Wifi, label: "Green WiFi", available: true },
          { icon: Leaf, label: "Eco Exhibits", available: true },
          { icon: Utensils, label: "Organic Lunch", available: true },
          { icon: Car, label: "EV Charging", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1497436072909-f5e4be99a4d8?w=800",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
        ]
      },
      "healthcare": {
        tags: ["HealthTech", "Medical AI", "IoT", "Digital Health"],
        highlights: [
          "Medical device demos",
          "Telemedicine platforms",
          "Health data analytics",
          "Regulatory compliance"
        ],
        amenities: [
          { icon: Wifi, label: "Hospital-Grade WiFi", available: true },
          { icon: HeartIcon, label: "Health Demos", available: true },
          { icon: Utensils, label: "Healthy Lunch", available: true },
          { icon: Shield, label: "HIPAA Compliance", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
        ]
      },
      "edtech": {
        tags: ["EdTech", "E-Learning", "Education", "Digital"],
        highlights: [
          "Interactive learning platforms",
          "VR/AR education demos",
          "Student engagement tools",
          "Learning analytics"
        ],
        amenities: [
          { icon: Wifi, label: "Student WiFi", available: true },
          { icon: GraduationCap, label: "Learning Labs", available: true },
          { icon: Utensils, label: "Student Lunch", available: true },
          { icon: Monitor, label: "Demo Classrooms", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
        ]
      },
      "fintech": {
        tags: ["Fintech", "Blockchain", "Payments", "Banking"],
        highlights: [
          "Cryptocurrency workshops",
          "Payment gateway demos",
          "Regulatory compliance",
          "DeFi platform showcase"
        ],
        amenities: [
          { icon: Wifi, label: "Secure WiFi", available: true },
          { icon: DollarSign, label: "Trading Demos", available: true },
          { icon: Utensils, label: "Business Lunch", available: true },
          { icon: Shield, label: "Security Features", available: true }
        ],
        gallery: [
          event?.image,
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
          "https://images.unsplash.com/photo-1642104704074-907c0698abc9?w=800",
          "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800"
        ]
      }
    };

    // Determine event type based on title
    const title = event.title.toLowerCase();
    if (title.includes('startup')) return eventTypeMap.startup;
    if (title.includes('ai')) return eventTypeMap.ai;
    if (title.includes('react')) return eventTypeMap.react;
    if (title.includes('cloud')) return eventTypeMap.cloud;
    if (title.includes('security') || title.includes('cyber')) return eventTypeMap.security;
    if (title.includes('marketing')) return eventTypeMap.marketing;
    if (title.includes('green')) return eventTypeMap.green;
    if (title.includes('healthcare')) return eventTypeMap.healthcare;
    if (title.includes('edtech')) return eventTypeMap.edtech;
    if (title.includes('fintech')) return eventTypeMap.fintech;
    
    // Default fallback
    return eventTypeMap.startup;
  };

  const eventExtras = {
    ...getEventExtras(event),
    organizer: {
      name: "TechEvents India",
      rating: 4.8,
      events: 156,
      verified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    reviews: [
      {
        id: 1,
        user: "Priya Sharma",
        rating: 5,
        comment: "Excellent content and great networking opportunities. Highly recommended!",
        date: "2 days ago",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b9f1a5ec?w=50"
      },
      {
        id: 2,
        user: "Rohit Kumar",
        rating: 4,
        comment: "Very informative sessions with industry experts. Worth attending!",
        date: "1 week ago", 
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50"
      },
      {
        id: 3,
        user: "Anita Desai",
        rating: 5,
        comment: "Perfect venue, excellent speakers, and great learning experience!",
        date: "2 weeks ago",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50"
      }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: `Check out this amazing event: ${event.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-gray-400 mb-6">The event you're looking for doesn't exist.</p>
          <Link 
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
  };

  const dateInfo = formatDate(event.date);
  const averageRating = eventExtras.reviews.reduce((acc, review) => acc + review.rating, 0) / eventExtras.reviews.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-2xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-[70vh] overflow-hidden">
          <img 
            src={eventExtras.gallery[selectedImageIndex]} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Image Gallery Thumbnails */}
          <div className="absolute bottom-6 left-6 flex gap-2">
            {eventExtras.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageIndex === index ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-black/30 text-white/80 hover:bg-black/50'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:bg-black/50 hover:text-white transition-all duration-200"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Event Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {eventExtras.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{averageRating.toFixed(1)}</span>
                <span className="text-white/70">({eventExtras.reviews.length} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>250+ attending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 -mt-20 bg-white rounded-t-[3rem] min-h-screen">
        <div className="p-8 pt-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Event Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Info className="w-6 h-6 text-blue-600" />
                    Event Details
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-semibold text-gray-800">{dateInfo.weekday}</p>
                          <p className="font-bold text-lg text-gray-800">{dateInfo.month} {dateInfo.day}, {dateInfo.year}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time</p>
                          <p className="font-bold text-lg text-gray-800">9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-bold text-lg text-gray-800">{event.location}</p>
                          <p className="text-sm text-gray-600">Get directions</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                          <Ticket className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-bold text-2xl text-purple-600">₹{event.price || '2500'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-8 border border-green-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {eventExtras.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities & Services</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {eventExtras.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl text-center transition-all duration-200 ${
                          amenity.available
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-50 text-gray-400 border border-gray-200'
                        }`}
                      >
                        <amenity.icon className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-semibold">{amenity.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
                      <span className="text-gray-600">({eventExtras.reviews.length} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {eventExtras.reviews.slice(0, showAllReviews ? eventExtras.reviews.length : 2).map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{review.user}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {eventExtras.reviews.length > 2 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      {showAllReviews ? 'Show Less' : 'Show All Reviews'}
                    </button>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking Card */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white sticky top-8">
                  <div className="text-center mb-6">
                    <p className="text-blue-100 mb-2">Starting from</p>
                    <p className="text-4xl font-bold">₹{event.price || '2500'}</p>
                    <p className="text-blue-100">per person</p>
                  </div>

                  <Link
                    to={`/book/${event.id}`}
                    className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 mb-4"
                  >
                    <Ticket className="w-5 h-5" />
                    Register Now
                  </Link>

                  <div className="text-center text-blue-100 text-sm">
                    <p>✅ Instant confirmation</p>
                    <p>✅ Free cancellation up to 24h</p>
                    <p>✅ Mobile tickets accepted</p>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Event Organizer</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={eventExtras.organizer.avatar}
                      alt={eventExtras.organizer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{eventExtras.organizer.name}</h4>
                        {eventExtras.organizer.verified && (
                          <Shield className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{eventExtras.organizer.rating}</span>
                        <span>•</span>
                        <span>{eventExtras.organizer.events} events</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Organizer
                  </button>
                </div>

                {/* Social Proof */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-6 border border-green-100">
                  <div className="text-center">
                    <div className="flex justify-center -space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={`https://images.unsplash.com/photo-${1494790108755 + i}-2616b9f1a5ec?w=40`}
                          alt=""
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold text-green-600">250+ people</span> are registered
                    </p>
                    <p className="text-xs text-gray-500">Join them for an amazing learning experience!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}