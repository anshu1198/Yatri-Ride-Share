import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [userRides, setUserRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRides();
  }, []);

  const fetchUserRides = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rides");
      const rides = res.data.filter(ride => 
        ride.driver._id === user._id || ride.passengers.some(p => p._id === user._id)
      );
      setUserRides(rides);
    } catch (err) {
      toast.error("Failed to fetch rides");
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Rides</h2>
        {userRides.length > 0 ? (
          <div className="space-y-4">
            {userRides.map((ride) => (
              <div key={ride._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {ride.pickupLocation} ? {ride.dropoffLocation}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    ride.status === "available" ? "bg-green-100 text-green-800" :
                    ride.status === "booked" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {ride.status}
                  </span>
                </div>
                <p className="text-gray-600">{ride.date} at {ride.time}</p>
                <p className="text-sm text-gray-600">
                  {ride.driver._id === user._id ? "Driving" : "Passenger"} • ${ride.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No rides yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
