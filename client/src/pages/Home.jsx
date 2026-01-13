import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';

const Home = () => {
  const [selectedLoan, setSelectedLoan] = useState('personal');
  
  const loanOffers = [
    {
      id: 'personal',
      type: 'Personal Loan',
      rate: '10.5%',
      amount: '₹50K - ₹40L',
      tenure: '6-60 months',
      features: ['No collateral required', 'Instant approval', 'Minimal documentation'],
      icon: '👤'
    },
    {
      id: 'education',
      type: 'Education Loan',
      rate: '8.5%',
      amount: '₹1L - ₹1.5Cr',
      tenure: '5-15 years',
      features: ['Study abroad support', 'Moratorium period', 'Tax benefits'],
      icon: '🎓'
    },
    {
      id: 'home',
      type: 'Home Loan',
      rate: '8.75%',
      amount: '₹5L - ₹10Cr',
      tenure: '5-30 years',
      features: ['Lowest interest rates', 'Balance transfer', 'Top-up facility'],
      icon: '🏠'
    },
    {
      id: 'business',
      type: 'Business Loan',
      rate: '12%',
      amount: '₹1L - ₹75L',
      tenure: '12-84 months',
      features: ['Quick disbursement', 'Flexible repayment', 'Collateral free'],
      icon: '💼'
    }
  ];

  const handleApplyNow = (loanType = null) => {
    const token = localStorage.getItem('token');
    const url = loanType ? `/apply?type=${loanType}` : '/apply';
    if (token) {
      window.location.href = url;
    } else {
      localStorage.setItem('selectedLoanType', loanType || 'personal');
      window.location.href = '/login';
    }
  };

  const selectedLoanData = loanOffers.find(loan => loan.id === selectedLoan);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-5xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Get Instant Loans at 
                <span className="text-blue-600"> Lowest Rates</span>
              </motion.h2>
              <p className="text-xl text-gray-600 mb-8">Quick approval, minimal documentation, and competitive interest rates starting from 8.5% per annum</p>
              
              {/* Loan Type Selector */}
              <div className="flex flex-wrap gap-3 mb-8">
                {loanOffers.map((loan) => (
                  <button
                    key={loan.id}
                    onClick={() => setSelectedLoan(loan.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedLoan === loan.id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {loan.icon} {loan.type}
                  </button>
                ))}
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedLoanData.type}</h3>
                  <span className="text-2xl font-bold text-green-600">{selectedLoanData.rate}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <div className="font-semibold">{selectedLoanData.amount}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Tenure:</span>
                    <div className="font-semibold">{selectedLoanData.tenure}</div>
                  </div>
                </div>
              </div>
              
              <motion.button 
                onClick={() => handleApplyNow(selectedLoan)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Apply for {selectedLoanData.type}
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    💰
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Approval</h3>
                  <p className="text-gray-600">Get approved in minutes with our AI-powered loan processing system</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section id="loans" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Loan</h3>
            <p className="text-xl text-gray-600">Tailored solutions for every financial need</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanOffers.map((offer, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {offer.icon}
                  </motion.div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{offer.type}</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{offer.rate}</div>
                  <div className="text-sm text-gray-500 mb-6">Interest Rate p.a.</div>
                  
                  <div className="space-y-3 mb-6 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold">{offer.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenure:</span>
                      <span className="font-semibold">{offer.tenure}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-8 text-left">
                    {offer.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button 
                    onClick={() => handleApplyNow(offer.id)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why 50,000+ Customers Trust Us</h3>
            <p className="text-xl text-gray-600">Experience the future of lending with our innovative platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">🏆</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Competitive Rates</h4>
              <p className="text-gray-600">Starting from 8.5% - among the lowest in the market</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Instant Approval</h4>
              <p className="text-gray-600">Get approved in minutes with AI-powered processing</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">100% Secure</h4>
              <p className="text-gray-600">Bank-grade security with 256-bit SSL encryption</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Digital First</h4>
              <p className="text-gray-600">Complete paperless process from application to disbursement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Financial Future?</h3>
          <p className="text-xl mb-8 opacity-90">Join 50,000+ happy customers who got their loans approved instantly</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => handleApplyNow()}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all text-lg"
            >
              Get Your Loan Now
            </button>
            <a 
              href="/compare" 
              className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 font-semibold transition-all"
            >
              Compare All Loans
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm opacity-75">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">₹500Cr+</div>
              <div className="text-sm opacity-75">Loans Disbursed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2 Min</div>
              <div className="text-sm opacity-75">Approval Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded"><img src="https://play-lh.googleusercontent.com/ij3IqRmQAOv20-YlYqHX4PAs2gEbzghbeH7gqV727IVYiDKXTIilgvXRUmzVMppubig" alt="LOGO" /></div>
                <h3 className="text-xl font-bold">LoanKart</h3>
              </div>
              <p className="text-gray-400">Making loans simple, fast, and affordable for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Loans</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Personal Loan</a></li>
                <li><a href="#" className="hover:text-white">Education Loan</a></li>
                <li><a href="#" className="hover:text-white">Home Loan</a></li>
                <li><a href="#" className="hover:text-white">Business Loan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LoanKart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;