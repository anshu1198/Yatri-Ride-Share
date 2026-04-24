import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, IndianRupee, Clock, CheckCircle, XCircle } from 'lucide-react';
import bookingService from '../services/bookingService';
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [driverRequests, setDriverRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('passenger'); // 'passenger' or 'driver'
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const [passengerData, driverData] = await Promise.all([
        bookingService.getUserBookings(),
        bookingService.getDriverBookings()
      ]);
      setBookings(passengerData);
      setDriverRequests(driverData);
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

  const handleApprove = async (bookingId) => {
    try {
      await bookingService.approveBooking(bookingId);
      toast.success("Booking approved!");
      fetchBookings();
    } catch (err) {
      toast.error("Failed to approve booking");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await bookingService.rejectBooking(bookingId);
      toast.success("Booking rejected!");
      fetchBookings();
    } catch (err) {
      toast.error("Failed to reject booking");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="bg-gray-100 p-1 rounded-2xl flex gap-1">
          <button 
            onClick={() => setActiveTab('passenger')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'passenger' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            My Trips
          </button>
          <button 
            onClick={() => setActiveTab('driver')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'driver' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Booking Requests
            {driverRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {driverRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 h-40 rounded-2xl"></div>
          ))}
        </div>
      ) : activeTab === 'passenger' ? (
        bookings.length > 0 ? (
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

                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-700 font-bold text-xs">
                        {booking.ride?.driver?.name?.charAt(0) || 'G'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Driver</p>
                      <p className="text-sm font-medium text-gray-900">{booking.ride?.driver?.name || 'Guest Driver'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate(`/ride/${booking.ride._id}`)}
                      className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      Message
                    </button>
                    {booking.status === 'confirmed' && (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="text-red-600 hover:text-red-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
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
          <h3 className="text-xl font-semibold text-gray-900">No trips yet</h3>
          <p className="text-gray-500 mt-2">When you book a ride, it will appear here.</p>
          <a href="/search" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Find a Ride
          </a>
        </div>
      )
    ) : (
        driverRequests.length > 0 ? (
          <div className="space-y-6">
            {driverRequests.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900 mt-2">
                        {booking.ride?.pickupLocation} → {booking.ride?.dropoffLocation}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">₹{booking.totalPrice}</p>
                      <p className="text-sm text-gray-500">{booking.seatsBooked} Seat(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-700 font-bold text-xs">
                          {booking.passenger?.name?.charAt(0) || 'P'}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Passenger</p>
                        <p className="text-sm font-medium text-gray-900">{booking.passenger?.name || 'Passenger'}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/ride/${booking.ride._id}?chatWith=${booking.passenger._id}`)} className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                        Message
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(booking._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            Accept
                          </button>
                          <button onClick={() => handleReject(booking._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
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
            <h3 className="text-xl font-semibold text-gray-900">No booking requests yet</h3>
            <p className="text-gray-500 mt-2">When someone books your ride, it will appear here.</p>
            <a href="/post-ride" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Offer a Ride
            </a>
          </div>
        )
      )}
    </div>
  );
};

export default BookingHistory;
