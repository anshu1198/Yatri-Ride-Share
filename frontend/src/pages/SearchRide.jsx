import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, Users, IndianRupee, Navigation } from 'lucide-react';
import rideService from '../services/rideService';
import RideCard from '../components/RideCard';
import SearchBar from '../components/SearchBar';

const SearchRide = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async (searchParams = {}) => {
    try {
      setLoading(true);
      const data = await rideService.getAllRides(searchParams);
      setRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    fetchRides(searchFilters);
  };

  const formatTime12Hour = (time24) => {
    if (!time24) return '';
    if (time24.includes('AM') || time24.includes('PM')) return time24;
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const getExactMatches = () => rides.filter(ride => !filters.time || ride.time === formatTime12Hour(filters.time));
  const getAlternateMatches = () => rides.filter(ride => filters.time && ride.time !== formatTime12Hour(filters.time));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-16">
      <div className="space-y-6">
        <h1 className="text-6xl font-black text-black tracking-tighter">Where to?</h1>
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100 animate-fade-in">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex justify-between items-end border-b border-gray-100 pb-8">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Results</p>
            <h2 className="text-3xl font-black text-black tracking-tighter">
              {loading ? 'Searching...' : `${rides.length} rides available`}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-50 h-96 rounded-[2rem]"></div>
            ))}
          </div>
        ) : rides.length > 0 ? (
          <div className="space-y-12">
            {/* Exact Matches */}
            {getExactMatches().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {getExactMatches().map((ride, i) => (
                  <div key={ride._id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <RideCard ride={ride} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-amber-50 text-amber-700 p-6 rounded-3xl border border-amber-200 text-center font-bold">
                No rides found exactly at {formatTime12Hour(filters.time)}. Showing alternate times below!
              </div>
            )}

            {/* Alternate Matches */}
            {filters.time && getAlternateMatches().length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-900">Alternate Departure Times</h3>
                  <p className="text-gray-500 font-medium">Other rides available on this date for your route.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {getAlternateMatches().map((ride, i) => (
                    <div key={ride._id} className="animate-fade-in opacity-80 hover:opacity-100 transition-opacity" style={{ animationDelay: `${i * 100}ms` }}>
                      <RideCard ride={ride} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
              <Navigation className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">No rides found for this route</h3>
              <p className="text-gray-500 font-medium mt-2">Try adjusting your filters or search for another destination.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRide;
