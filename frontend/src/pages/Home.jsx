import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import rideService from '../services/rideService';
import RideCard from '../components/RideCard';
import { ArrowRight, Shield, Clock, IndianRupee, MapPin, Search, Star, Users, Navigation, Zap } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await rideService.getAllRides();
        setRides(data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="space-y-32 pb-32 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-black font-black text-[10px] tracking-widest uppercase">
              <Zap className="w-3 h-3 fill-black" />
              Moving India Forward
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter">
              Go anywhere <br />
              <span className="text-gray-400">with ease.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-medium">
              The smartest way to travel inter-city. Connect with verified drivers, set your price, and enjoy a premium travel experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/search"
                className="bg-black text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all shadow-2xl shadow-gray-200 flex items-center justify-center gap-3 group"
              >
                Find a Ride
                <Navigation className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                to="/post-ride"
                className="bg-gray-100 text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
              >
                Offer a Ride
              </Link>
            </div>
          </div>
          
          <div className="relative lg:h-[700px] flex items-center justify-center animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-transparent rounded-[4rem] -z-10 transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Travel" 
              className="w-full h-auto max-w-xl rounded-[3rem] shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700 object-cover"
            />
            {/* Floating UI Element */}
            <div className="absolute top-1/4 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 hidden md:block animate-bounce">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                   <Shield className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-xs font-black text-gray-400 uppercase">Verified</p>
                   <p className="font-black text-gray-900">100% Secure</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="bg-black py-32 transform skew-y-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 transform -skew-y-1 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white">Economical.</h3>
            <p className="text-gray-400 font-medium">Save on every trip by sharing costs with verified community members.</p>
          </div>
          <div className="space-y-4 border-l border-gray-800 pl-16">
            <h3 className="text-4xl font-black text-white">Safe.</h3>
            <p className="text-gray-400 font-medium">Every driver and passenger is identity verified for your peace of mind.</p>
          </div>
          <div className="space-y-4 border-l border-gray-800 pl-16">
            <h3 className="text-4xl font-black text-white">Simple.</h3>
            <p className="text-gray-400 font-medium">Just search, book, and go. No hidden fees or complicated processes.</p>
          </div>
        </div>
      </section>

      {/* Featured Rides */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-black text-black tracking-tighter mb-4">Nearby Rides.</h2>
            <p className="text-gray-500 font-medium">Top-rated drivers heading to destinations near you.</p>
          </div>
          <Link to="/search" className="group flex items-center gap-2 font-black text-black hover:text-gray-600 transition-colors">
            See all <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-50 h-96 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : rides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {rides.slice(0, 3).map(ride => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-[3rem] p-32 text-center border-2 border-dashed border-gray-100">
             <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
             <p className="text-gray-400 font-black text-2xl uppercase tracking-widest">No rides found</p>
             <Link to="/post-ride" className="inline-block mt-8 btn-uber">Start a Journey</Link>
          </div>
        )}
      </section>

      {/* Premium CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-gray-900 rounded-[4rem] p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
          <div className="relative z-10 max-w-xl space-y-8">
            <h2 className="text-5xl font-black text-white leading-none tracking-tighter">Start your journey <br />with Yatri today.</h2>
            <div className="flex gap-4">
              <Link to="/register" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all">
                Join Community
              </Link>
              <Link to="/search" className="border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                Find Rides
              </Link>
            </div>
          </div>
          <div className="relative z-10 hidden lg:block">
            <div className="text-[12rem] font-black text-white/5 absolute -right-20 -bottom-32 select-none pointer-events-none">GO</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
