import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Star, MapPin, PenLine, Settings, LogOut, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return <div className="text-center py-20 font-bold text-gray-400">Please login to view profile</div>;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-indigo-100 rounded-3xl mx-auto flex items-center justify-center text-4xl font-black text-indigo-600 shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
                <p className="text-gray-500 font-medium">{user.email}</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="font-black">4.9</span>
                <span className="text-gray-400 font-bold text-sm ml-1">(24 Reviews)</span>
              </div>
            </div>

            <div className="mt-10 space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <User className="w-5 h-5" />
                Profile Info
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
            {activeTab === 'profile' ? (
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Account Information</h3>
                  <button className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">
                    <PenLine className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-50">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="font-bold text-gray-900">{user.name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-50">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="font-bold text-gray-900">{user.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Account Status</p>
                    <div className="flex items-center gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-50 text-emerald-700">
                      <Shield className="w-5 h-5" />
                      <span className="font-bold uppercase tracking-wider text-xs">Verified Member</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Member Since</p>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-50">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="font-bold text-gray-900">April 2026</span>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-gray-50">
                  <h4 className="text-xl font-black text-gray-900 mb-6">Recent Reviews</h4>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex-shrink-0 flex items-center justify-center font-bold text-indigo-600">
                          P
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">Priya K.</span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {"★".repeat(5)}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed font-medium italic">
                            "Excellent driver! Very punctual and safe driving. The car was clean and comfortable. Highly recommended for long journeys."
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center">
                <Settings className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400">Settings page under construction</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
