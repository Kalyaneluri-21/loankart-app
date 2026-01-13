import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoanTypes, setShowLoanTypes] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const loanTypes = [
    { name: 'Personal Loan', href: '/apply?type=personal' },
    { name: 'Education Loan', href: '/apply?type=education' },
    { name: 'Home Loan', href: '/apply?type=home' },
    { name: 'Business Loan', href: '/apply?type=business' }
  ];
  
  return (
    <motion.header 
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              LK
            </div>
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              LoanKart
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <div className="bg-gray-50 rounded-full px-2 py-2 shadow-inner">
              <div className="flex items-center space-x-1">
                <Link 
                  to="/" 
                  className="px-6 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/compare" 
                  className="px-6 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 font-medium"
                >
                  Compare
                </Link>
                {token && (
                  <Link 
                    to="/dashboard" 
                    className="px-6 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                
                {/* Loan Types Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowLoanTypes(true)}
                  onMouseLeave={() => setShowLoanTypes(false)}
                >
                  <button className="px-6 py-2 rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 font-medium flex items-center space-x-1">
                    <span>Loan Types</span>
                    <svg className={`w-4 h-4 transition-transform ${showLoanTypes ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {showLoanTypes && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-48 z-50"
                      >
                        {loanTypes.map((loan, index) => (
                          <Link
                            key={index}
                            to={loan.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                          >
                            {loan.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {token ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium">
                    Admin
                  </Link>
                )}
                <motion.button 
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-full font-medium shadow-lg"
                  whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/apply" 
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-100"
            >
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/" className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  Home
                </Link>
                <Link to="/compare" className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  Compare
                </Link>
                {token && (
                  <Link to="/dashboard" className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                    Dashboard
                  </Link>
                )}
                
                <div className="px-4 py-2">
                  <div className="text-sm font-semibold text-gray-500 mb-2">Loan Types</div>
                  {loanTypes.map((loan, index) => (
                    <Link
                      key={index}
                      to={loan.href}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      {loan.name}
                    </Link>
                  ))}
                </div>
                
                {token ? (
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="px-4 py-3 text-purple-600 hover:bg-gray-50 rounded-lg font-medium">
                        Admin
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="mx-4 px-6 py-3 bg-red-500 text-white rounded-lg font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                      Login
                    </Link>
                    <Link 
                      to="/apply" 
                      className="mx-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-center"
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;