import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Search, CirclePlus, History, LayoutDashboard, ChevronDown, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-black flex items-center justify-center text-white rounded-lg group-hover:rotate-6 transition-transform">
              <span className="text-xl font-black italic">Y</span>
            </div>
            <span className="text-xl font-black text-black tracking-tighter">Yatri</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/search" className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors">
              Find a Ride
            </Link>
            <Link to="/post-ride" className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors">
              Offer a Ride
            </Link>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/bookings" className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors">
                  My Trips
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors">
                    Admin
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors">
                    <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-black">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="p-2">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors px-4">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-8 space-y-6 border-t border-gray-50">
          <Link to="/search" className="block text-2xl font-black text-black" onClick={() => setIsMenuOpen(false)}>Find Ride</Link>
          <Link to="/post-ride" className="block text-2xl font-black text-black" onClick={() => setIsMenuOpen(false)}>Offer Ride</Link>
          {user ? (
            <>
              <Link to="/bookings" className="block text-2xl font-black text-black" onClick={() => setIsMenuOpen(false)}>My Trips</Link>
              <Link to="/profile" className="block text-2xl font-black text-black" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-2xl font-black text-red-600 pt-6 border-t border-gray-100"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
              <Link to="/login" className="text-center py-4 font-bold text-black border-2 border-black rounded-xl" onClick={() => setIsMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="text-center py-4 font-bold text-white bg-black rounded-xl" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
