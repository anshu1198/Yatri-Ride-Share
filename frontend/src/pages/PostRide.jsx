import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import rideService from '../services/rideService';
import { toast } from 'react-toastify';
import { MapPin, Calendar, Clock, Users, IndianRupee, FileText, Send, Sparkle, Car } from 'lucide-react';

const PostRide = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    seats: 1,
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await rideService.createRide(formData);
      toast.success('Ride posted successfully!');
      navigate('/search');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 font-bold text-sm mb-4">
          <Sparkle className="w-4 h-4" />
          Share the Cost, Share the Journey
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Offer a Ride</h1>
        <p className="text-gray-500 mt-2 font-medium">Fill in the details to find passengers heading your way.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Locations */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900"
                  placeholder="e.g. Hyderabad"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Dropoff Location
                </label>
                <input
                  type="text"
                  name="dropoffLocation"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900"
                  placeholder="e.g. Bangalore"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Travel Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Departure Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Price & Seats */}
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-indigo-600" />
                Price per Seat
              </label>
              <input
                type="number"
                name="price"
                required
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900"
                placeholder="₹"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Available Seats
              </label>
              <select
                name="seats"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900"
                value={formData.seats}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} Seat{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <Car className="w-4 h-4 text-gray-900" />
                Vehicle Model
              </label>
              <input
                type="text"
                name="vehicleModel"
                className="input-premium"
                placeholder="e.g. Swift Dzire"
                value={formData.vehicleModel || ''}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-200" />
                Vehicle Color
              </label>
              <input
                type="text"
                name="vehicleColor"
                className="input-premium"
                placeholder="e.g. White"
                value={formData.vehicleColor || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-900" />
              Description (Optional)
            </label>
            <textarea
              name="description"
              rows="4"
              className="input-premium"
              placeholder="Tell passengers about your vehicle, pickup points, etc."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? 'Posting...' : (
              <>
                Post Ride Now
                <Send className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRide;
