import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, IndianRupee, Clock, CheckCircle, XCircle } from 'lucide-react';
import bookingService from '../services/bookingService';
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getUserBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {loading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 h-40 rounded-2xl"></div>
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mt-2">
                      {booking.ride.pickupLocation} → {booking.ride.dropoffLocation}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">₹{booking.totalPrice}</p>
                    <p className="text-sm text-gray-500">{booking.seatsBooked} Seat(s)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="text-sm">{booking.ride.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="text-sm">{booking.ride.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="text-sm">Inter-city</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-700 font-bold text-xs">
                        {booking.ride.driver.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Driver</p>
                      <p className="text-sm font-medium text-gray-900">{booking.ride.driver.name}</p>
                    </div>
                  </div>
                  
                  {booking.status === 'confirmed' && (
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No bookings yet</h3>
          <p className="text-gray-500 mt-2">When you book a ride, it will appear here.</p>
          <a href="/search" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Find a Ride
          </a>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
