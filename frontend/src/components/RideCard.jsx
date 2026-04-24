import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, IndianRupee, ArrowRight, ShieldCheck, Car, Star } from 'lucide-react';

const RideCard = ({ ride }) => {
  return (
    <div className="card-premium group relative overflow-hidden bg-white">
      <div className="p-6 sm:p-8">
        {/* Header: Driver & Badge */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shadow-lg">
                {ride.driver?.name?.charAt(0) || 'D'}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">{ride.driver?.name || 'Verified Driver'}</p>
              <div className="flex items-center gap-1 text-amber-500 text-[10px]">
                <Star className="w-3 h-3 fill-amber-500" />
                <span className="font-bold">4.8</span>
                <span className="text-gray-400 ml-1">(120+ rides)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-gray-900 flex items-center justify-end tracking-tighter">
              <IndianRupee className="w-5 h-5" />
              {ride.price}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Instant Booking</p>
          </div>
        </div>

        {/* Route Visualization */}
        <div className="relative mb-8 pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-gray-200"></div>
          
          <div className="relative mb-6">
            <div className="absolute -left-7 top-1 w-4 h-4 rounded-full border-2 border-gray-900 bg-white z-10"></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">From</p>
            <h3 className="text-lg font-black text-gray-900 leading-tight">{ride.pickupLocation}</h3>
          </div>

          <div className="relative">
            <div className="absolute -left-7 top-1 w-4 h-4 rounded-full bg-gray-900 z-10"></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">To</p>
            <h3 className="text-lg font-black text-gray-900 leading-tight">{ride.dropoffLocation}</h3>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-6 border-y border-gray-50 mb-8">
          <div className="text-center">
            <Calendar className="w-4 h-4 mx-auto mb-2 text-gray-400" />
            <p className="text-[10px] font-black text-gray-900">{ride.date}</p>
          </div>
          <div className="text-center border-x border-gray-50">
            <Clock className="w-4 h-4 mx-auto mb-2 text-gray-400" />
            <p className="text-[10px] font-black text-gray-900">{ride.time}</p>
          </div>
          <div className="text-center">
            <Users className="w-4 h-4 mx-auto mb-2 text-gray-400" />
            <p className="text-[10px] font-black text-gray-900">{ride.seats} available</p>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="flex items-center gap-3 mb-8 bg-gray-50 p-4 rounded-2xl">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Car className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vehicle Details</p>
            <p className="text-sm font-bold text-gray-900">Swift Dzire (White)</p>
          </div>
        </div>

        <Link 
          to={`/ride/${ride._id}`}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-black transition-all hover:bg-black group-hover:shadow-2xl group-hover:shadow-gray-200"
        >
          View Details
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default RideCard;
