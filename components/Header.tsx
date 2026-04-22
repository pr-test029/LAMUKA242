
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: '/', label: 'Accueil' },
    { id: '/a-propos', label: 'À Propos' },
    { id: '/services', label: 'Nos Actions' },
    { id: '/blog', label: 'Blog' },
    { id: '/contact', label: 'Contact' },
  ];


  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-pink-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center cursor-pointer group" 
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src="https://pr-gallery029.netlify.app/Stock_images/logo_lamuka_242.png" 
              alt="Logo LAMUKA" 
              className="h-12 w-auto mr-3 object-contain transition-transform group-hover:scale-105" 
            />
            <span className="font-bold text-xl text-pink-900 tracking-tight">LAMUKA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className={`flex items-center text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.id
                    ? 'text-pink-700 font-semibold'
                    : 'text-gray-500 hover:text-pink-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-pink-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-pink-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.id
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-pink-600'
                }`}
              >
                <div className="flex items-center">
                   {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
