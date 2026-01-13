import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoanCard from '../components/LoanCard.jsx';
import Toast from '../components/Toast.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { apiCall } from '../config/api.js';

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await apiCall('/api/loans', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoans(Array.isArray(data) ? data : []);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Fetch loans error:', errorData);
        setToast({ message: errorData.error || 'Error fetching loans', type: 'error' });
      }
    } catch (error) {
      console.error('Fetch loans error:', error);
      setToast({ message: `Failed to load loans: ${error.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My Loan Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Manage your loans and track payments
            </motion.p>
          </div>
          <motion.button 
            onClick={() => window.location.href = '/apply'}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Apply for New Loan
          </motion.button>
        </motion.div>
      
        {loans.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No loans yet</h3>
            <p className="text-gray-500 mb-6">Start your financial journey by applying for your first loan</p>
            <button 
              onClick={() => window.location.href = '/apply'}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all font-medium"
            >
              Apply Now
            </button>
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-blue-600">{loans.length}</div>
                <div className="text-gray-600">Total Loans</div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-green-600">
                  {loans.filter(l => l.status === 'approved' || l.status === 'active').length}
                </div>
                <div className="text-gray-600">Approved</div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-lg"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-yellow-600">
                  {loans.filter(l => l.status === 'submitted' || l.status === 'review').length}
                </div>
                <div className="text-gray-600">Pending</div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {loans.map((loan, index) => (
                <motion.div
                  key={loan._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <LoanCard loan={loan} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;