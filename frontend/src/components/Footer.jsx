import React from 'react';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black mb-6 text-indigo-400">Yatri</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connecting drivers and passengers for a more economical, comfortable, and eco-friendly travel experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/search" className="text-gray-400 hover:text-white transition-colors">Search Rides</a></li>
              <li><a href="/post-ride" className="text-gray-400 hover:text-white transition-colors">Post a Ride</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-white transition-colors">Login / Sign Up</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-indigo-400" />
                <span>123 Ride Street, Tech City, India</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-indigo-400" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-indigo-400" />
                <span>support@yatri.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Yatri. All rights reserved. Built with Passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
