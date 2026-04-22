import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const RideDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRide();
  }, [id]);

  const fetchRide = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rides/${id}`);
      setRide(res.data);
    } catch (err) {
      toast.error("Failed to fetch ride details");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleBookRide = async () => {
    try {
      await axios.post(`http://localhost:5000/api/rides/${id}/book`);
      toast.success("Ride booked successfully!");
      fetchRide();
    } catch (err) {
      toast.error("Failed to book ride");
    }
  };

  const handleDeleteRide = async () => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      try {
        await axios.delete(`http://localhost:5000/api/rides/${id}`);
        toast.success("Ride deleted successfully!");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Failed to delete ride");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!ride) {
    return <div className="text-center py-10">Ride not found</div>;
  }

  const isDriver = ride.driver._id === user._id;
  const isPassenger = ride.passengers.some(p => p._id === user._id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {ride.pickupLocation} ? {ride.dropoffLocation}
            </h1>
            <p className="text-gray-600">{ride.date} at {ride.time}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">${ride.price}</p>
            <p className="text-sm text-gray-600">per seat</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ride Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Driver:</span> {ride.driver.name}</p>
              <p><span className="font-medium">Available Seats:</span> {ride.seats}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  ride.status === "available" ? "bg-green-100 text-green-800" :
                  ride.status === "booked" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {ride.status}
                </span>
              </p>
              {ride.description && (
                <p><span className="font-medium">Description:</span> {ride.description}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Passengers</h3>
            {ride.passengers.length > 0 ? (
              <div className="space-y-2">
                {ride.passengers.map((passenger) => (
                  <div key={passenger._id} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {passenger.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{passenger.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No passengers yet</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {!isDriver && !isPassenger && ride.status === "available" && (
            <button
              onClick={handleBookRide}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
            >
              Book This Ride
            </button>
          )}
          
          {isDriver && (
            <>
              <button
                onClick={() => navigate(`/edit-ride/${ride._id}`)}
                className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700"
              >
                Edit Ride
              </button>
              <button
                onClick={handleDeleteRide}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700"
              >
                Delete Ride
              </button>
            </>
          )}

          {isPassenger && (
            <div className="flex-1 bg-green-100 text-green-800 py-3 px-4 rounded-md text-center">
              You are booked for this ride
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
