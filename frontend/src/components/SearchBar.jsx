import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ pickupLocation: pickup, dropoffLocation: dropoff, date });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-1 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50/50"
          placeholder="Leaving from..."
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
      </div>

      <div className="flex-1 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50/50"
          placeholder="Going to..."
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
        />
      </div>

      <div className="flex-1 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50/50"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
