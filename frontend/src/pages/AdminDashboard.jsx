import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Car, Calendar, TrendingUp, AlertTriangle, CheckCircle, Search, MoreVertical } from 'lucide-react';
import rideService from '../services/rideService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1254,
    totalRides: 856,
    activeBookings: 342,
    revenue: 45200
  });

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-40">
        <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900">Access Denied</h2>
        <p className="text-gray-500 font-medium">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-indigo-600 font-black uppercase tracking-widest text-sm mb-2 block">Administrator</span>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">Platform Overview</h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="font-bold text-gray-600 text-sm">Last 30 Days</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-sm font-black flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +12%
            </span>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Total Users</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-sm font-black flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +8%
            </span>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Active Rides</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.totalRides.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-sm font-black flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +15%
            </span>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Bookings</p>
          <h3 className="text-3xl font-black text-gray-900">{stats.activeBookings.toLocaleString()}</h3>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100 group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-1">Gross Volume</p>
          <h3 className="text-3xl font-black text-white">₹{(stats.revenue).toLocaleString()}</h3>
        </div>
      </div>

      {/* Tables/Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">Recent Users</h3>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Driver', status: 'Active' },
                  { name: 'Priya Kapoor', email: 'priya@example.com', role: 'Passenger', status: 'Active' },
                  { name: 'Amit Verma', email: 'amit@example.com', role: 'Driver', status: 'Pending' },
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center font-bold text-indigo-600">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400 font-medium">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-sm text-gray-600">{u.role}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-gray-400 hover:text-gray-900"><MoreVertical className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">Reports & Alerts</h3>
            <button className="text-indigo-600 font-bold text-sm hover:underline">Manage</button>
          </div>
          <div className="p-8 space-y-6">
            {[
              { type: 'complaint', user: 'Sunil M.', text: 'Vehicle not as described in posting', time: '2 hours ago' },
              { type: 'verification', user: 'Ananya R.', text: 'Submitted documents for driver verification', time: '5 hours ago' },
              { type: 'system', user: 'Server', text: 'Daily database backup completed successfully', time: '12 hours ago' },
            ].map((a, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  a.type === 'complaint' ? 'bg-red-100 text-red-600' : 
                  a.type === 'verification' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {a.type === 'complaint' ? <AlertTriangle className="w-5 h-5" /> : 
                   a.type === 'verification' ? <Users className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{a.user}</h4>
                    <span className="text-[10px] text-gray-400 font-black uppercase">{a.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
