import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  CheckCircle, 
  Mail, 
  Calendar, 
  MapPin, 
  User, 
  Ticket, 
  Download, 
  Share2, 
  Home, 
  Clock,
  Phone,
  CreditCard,
  Star // Removed Confetti
} from "lucide-react";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  
  // Get booking data from navigation state
  const booking = location.state?.booking;

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    
    // Simulate ticket generation
    const ticketTimer = setTimeout(() => setTicketGenerated(true), 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(ticketTimer);
    };
  }, []);

  // If no booking data, redirect or show error
  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Booking Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your booking details.</p>
         
        </div>
      </div>
    );
  }

  const bookingId = `EVT-${Date.now().toString().slice(-6)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Booking:${bookingId}`;

  const handleDownloadTicket = () => {
    // Simulate ticket download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Ticket ID: ' + bookingId;
    element.download = `ticket-${bookingId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'My Event Booking',
        text: `I'm attending ${booking.event.title}! 🎉`,
        url: window.location.origin
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`I'm attending ${booking.event.title}! 🎉`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 animate-ping">
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🎉 Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Your tickets have been successfully booked. 
            Get ready for an amazing experience!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Booking Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                Confirmed
              </div>
            </div>

            <div className="space-y-6">
              {/* Booking ID */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono font-bold text-lg">{bookingId}</span>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-4 pl-7">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{booking.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{booking.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold">{booking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-purple-500" />
                  Ticket Information
                </h3>
                <div className="grid grid-cols-1 gap-4 pl-7">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{booking.tickets} ticket{booking.tickets > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-xl text-green-600">${booking.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="relative">
              <img 
                src={booking.event.image} 
                alt={booking.event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{booking.event.title}</h3>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Event Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-semibold">{booking.event.date}</p>
                    <p className="text-sm text-gray-600">{booking.event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-semibold">{booking.event.location}</p>
                    <p className="text-sm text-gray-600">Venue Address</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-600 mb-4">Your Digital Ticket</p>
                <div className="bg-white p-4 rounded-2xl shadow-inner inline-block">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="w-32 h-32 mx-auto"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Show this QR code at the venue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <Share2 className="w-5 h-5" />
            Share Event
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Email Notification */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-3 text-blue-700">
            <Mail className="w-6 h-6" />
            <div>
              <h4 className="font-semibold">Email Confirmation Sent</h4>
              <p className="text-sm">
                A detailed confirmation email has been sent to {booking.email}. 
                Please check your inbox and spam folder.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            What's Next?
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Save your booking confirmation email
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Arrive 30 minutes before the event starts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Bring a valid ID for verification
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Show your QR code or ticket at the entrance
            </li>
          </ul>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}