import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Mail, Phone, Ticket, CreditCard, Calendar, MapPin, Clock, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function BookingFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    tickets: 1,
    specialRequests: ""
  });
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  // Mock event data - replace with actual API call
  useEffect(() => {
    // Simulate loading event data
    const mockEvent = {
      id: id,
      title: "Summer Music Festival 2025",
      date: "July 15, 2025",
      time: "6:00 PM - 11:00 PM",
      location: "Central Park, New York",
      price: 89,
      availableTickets: 50,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    };
    setEvent(mockEvent);
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]+$/.test(form.phone)) newErrors.phone = "Invalid phone number";
    if (form.tickets < 1) newErrors.tickets = "At least 1 ticket required";
    if (event && form.tickets > event.availableTickets) {
      newErrors.tickets = `Only ${event.availableTickets} tickets available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventId: id }),
      });
      navigate("/confirmation", { 
        state: { 
          booking: { ...form, event, totalAmount: event.price * form.tickets }
        }
      });
    } catch (err) {
      console.error("Booking failed", err);
      setErrors({ submit: "Booking failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = event ? event.price * form.tickets : 0;

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Event Details
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Event Summary Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-8">
            <div className="relative mb-6">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{event.title}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-green-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
              <h4 className="font-semibold text-gray-800 mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ticket Price:</span>
                  <span>${event.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{form.tickets} ticket{form.tickets > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>$5.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalAmount + 5}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="font-semibold">Details</span>
              </div>
              <div className={`h-px flex-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className="font-semibold">Payment</span>
              </div>
            </div>

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
              {step === 1 ? (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Information</h2>
                  <p className="text-gray-600 mb-6">Please fill in your details to proceed with booking</p>

                  <div className="space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="name"
                          placeholder="Enter your full name"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 ${
                            errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 ${
                            errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="phone"
                          placeholder="Enter your phone number"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 ${
                            errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.phone && (
                        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    {/* Tickets Input */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Tickets</label>
                      <div className="relative">
                        <Ticket className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="tickets"
                          type="number"
                          min="1"
                          max={event.availableTickets}
                          placeholder="Number of tickets"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 ${
                            errors.tickets ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          value={form.tickets}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.tickets && (
                        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errors.tickets}
                        </div>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {event.availableTickets} tickets available
                      </p>
                    </div>

                    {/* Special Requests */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (Optional)</label>
                      <textarea
                        name="specialRequests"
                        placeholder="Any special requirements or requests..."
                        rows="3"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-200 resize-none"
                        value={form.specialRequests}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    Continue to Payment
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Details</h2>
                  <p className="text-gray-600 mb-6">Secure payment processing</p>

                  <div className="space-y-6">
                    {/* Mock Payment Form */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          placeholder="MM/YY"
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input
                          placeholder="123"
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="flex items-center gap-2 mt-4 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.submit}
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Complete Booking - $${totalAmount + 5}`
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
