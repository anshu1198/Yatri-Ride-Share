import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import rideService from "../services/rideService";
import bookingService from "../services/bookingService";
import messageService from "../services/messageService";
import { toast } from "react-toastify";
import { MapPin, Calendar, Clock, Users, IndianRupee, MessageSquare, ShieldCheck, Info, ChevronLeft, Send, Car } from 'lucide-react';

const RideDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    fetchRide();
  }, [id]);

  useEffect(() => {
    if (showChat && ride) {
      const otherUserId = user._id === ride.driver._id ? (ride.passengers[0]?._id) : ride.driver._id;
      if (otherUserId) {
        fetchMessages(otherUserId);
      }
    }
  }, [showChat]);

  const fetchRide = async () => {
    try {
      const data = await rideService.getRideById(id);
      setRide(data);
    } catch (err) {
      toast.error("Failed to fetch ride details");
      navigate("/search");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId) => {
    try {
      const data = await messageService.getMessages(otherUserId, id);
      setChatMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleBookRide = async () => {
    try {
      await bookingService.createBooking({ rideId: id, seatsBooked: 1 });
      toast.success("Ride booked successfully!");
      fetchRide();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book ride");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const receiverId = user._id === ride.driver._id ? (ride.passengers[0]?._id) : ride.driver._id;
      await messageService.sendMessage({
        receiverId,
        rideId: id,
        content: message
      });
      setMessage("");
      fetchMessages(receiverId);
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!ride) return <div className="text-center py-20 font-bold text-gray-500">Ride not found</div>;

  const isDriver = user && ride.driver._id === user._id;
  const isPassenger = user && ride.passengers.some(p => p._id === user._id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Ride Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pickup</p>
                      <h2 className="text-2xl font-black text-gray-900">{ride.pickupLocation}</h2>
                    </div>
                  </div>
                  <div className="w-0.5 h-10 bg-gray-100 ml-5"></div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Dropoff</p>
                      <h2 className="text-2xl font-black text-gray-900">{ride.dropoffLocation}</h2>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-600 text-white p-6 rounded-3xl text-center shadow-xl shadow-indigo-100">
                  <p className="text-sm font-bold opacity-80 mb-1">Total Price</p>
                  <div className="text-4xl font-black flex items-center justify-center">
                    <IndianRupee className="w-6 h-6" />
                    {ride.price}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-gray-50">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Date</p>
                    <p className="font-bold text-gray-900">{ride.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Time</p>
                    <p className="font-bold text-gray-900">{ride.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Seats</p>
                    <p className="font-bold text-gray-900">{ride.seats} available</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Car className="w-5 h-5 text-gray-900" />
                    Vehicle Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Model</p>
                      <p className="font-bold text-gray-900">{ride.vehicleInfo?.model || "Standard Sedan"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Color</p>
                      <p className="font-bold text-gray-900">{ride.vehicleInfo?.color || "White"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-gray-900" />
                    Ride Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100 font-medium">
                    {ride.description || "No additional information provided by the driver."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety & Info */}
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-emerald-900 mb-2">Verified Driver</h3>
              <p className="text-emerald-700">This driver has been verified through our safety protocol. Your safety is our priority.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Booking & Driver */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Driver Profile</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-20 w-20 rounded-3xl bg-indigo-100 flex items-center justify-center text-3xl font-black text-indigo-600 shadow-inner">
                {ride.driver.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900">{ride.driver.name}</h4>
                <div className="flex items-center gap-1 text-amber-500">
                  {"★".repeat(5)} <span className="text-gray-400 text-sm font-bold ml-1">(4.8/5)</span>
                </div>
              </div>
            </div>

            {!isDriver && user && (
              <div className="space-y-4">
                {!isPassenger ? (
                  <button
                    onClick={handleBookRide}
                    disabled={ride.seats === 0}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
                  >
                    {ride.seats === 0 ? "Full" : "Book Seat Now"}
                  </button>
                ) : (
                  <div className="bg-green-100 text-green-700 py-4 rounded-2xl font-black text-center border border-green-200">
                    You're Booked!
                  </div>
                )}
                
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Message Driver
                </button>
              </div>
            )}
            
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all"
              >
                Login to Book
              </button>
            )}
          </div>

          {/* Chat Interface (Simplified) */}
          {showChat && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[400px]">
              <div className="bg-gray-900 text-white p-4 font-bold flex justify-between items-center">
                <span>Chat with {ride.driver.name}</span>
                <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${
                      msg.sender === user._id ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 text-white p-2 rounded-xl">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
