import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rides");
      setRides(res.data);
    } catch (err) {
      toast.error("Failed to fetch rides");
    }
    setLoading(false);
  };

  const handleBookRide = async (rideId) => {
    try {
      await axios.post(`http://localhost:5000/api/rides/${rideId}/book`);
      toast.success("Ride booked successfully!");
      fetchRides();
    } catch (err) {
      toast.error("Failed to book ride");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Rides</h1>
          <p className="text-gray-600">Find your next ride</p>
        </div>
        <Link
          to="/create-ride"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Offer a Ride
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((ride) => (
          <div key={ride._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {ride.pickupLocation} ? {ride.dropoffLocation}
                </h3>
                <p className="text-gray-600">{ride.date} at {ride.time}</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">${ride.price}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Driver: {ride.driver.name}</span>
              <span className="text-sm text-gray-600">{ride.seats} seats</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs ${
                ride.status === "available" ? "bg-green-100 text-green-800" :
                ride.status === "booked" ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {ride.status}
              </span>
              {ride.status === "available" && ride.driver._id !== user._id && (
                <button
                  onClick={() => handleBookRide(ride._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Book Ride
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {rides.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No rides available at the moment.</p>
          <Link to="/create-ride" className="text-blue-600 hover:text-blue-800">
            Be the first to offer a ride!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
