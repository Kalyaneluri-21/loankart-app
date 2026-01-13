import React, { useState, useEffect } from 'react';
import { calcMonthlyPayment, calculateTotalPayment } from '../utils/calculator.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { apiCall } from '../config/api.js';

const LoanComparison = () => {
  const [loanOptions, setLoanOptions] = useState([]);
  const [filters, setFilters] = useState({
    amount: 10000,
    maxRate: 15,
    maxTerm: 60,
    type: 'all'
  });
  const [customLoan, setCustomLoan] = useState({
    amount: 10000,
    rate: 8.5,
    term: 36,
    type: 'custom'
  });

  useEffect(() => {
    fetchLoanOptions();
  }, []);

  const fetchLoanOptions = async () => {
    try {
      const response = await apiCall('/api/loans/options');
      if (response.ok) {
        const data = await response.json();
        setLoanOptions(data);
      }
    } catch (error) {
      console.error('Error fetching loan options:', error);
    }
  };

  const filteredOptions = loanOptions.filter(option => {
    return (
      (filters.type === 'all' || option.type === filters.type) &&
      option.interestRate <= filters.maxRate &&
      option.maxTerm >= filters.maxTerm &&
      filters.amount >= option.minAmount &&
      filters.amount <= option.maxAmount
    );
  });

  const calculateLoanDetails = (option, amount, term) => {
    const monthlyPayment = calcMonthlyPayment(amount, option.interestRate, term);
    const totalPayment = calculateTotalPayment(monthlyPayment, term);
    const totalInterest = totalPayment - amount;
    
    return {
      monthlyPayment,
      totalPayment,
      totalInterest
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const customLoanDetails = calculateLoanDetails(
    { interestRate: customLoan.rate },
    customLoan.amount,
    customLoan.term
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
      <h1>Loan Comparison Tool</h1>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Loan Calculator</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Loan Amount:</label>
            <input 
              type="number" 
              value={filters.amount}
              onChange={(e) => setFilters({...filters, amount: parseFloat(e.target.value) || 0})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Max Interest Rate (%):</label>
            <input 
              type="number" 
              step="0.1"
              value={filters.maxRate}
              onChange={(e) => setFilters({...filters, maxRate: parseFloat(e.target.value) || 0})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Term (months):</label>
            <input 
              type="number" 
              value={filters.maxTerm}
              onChange={(e) => setFilters({...filters, maxTerm: parseInt(e.target.value) || 0})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Loan Type:</label>
            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="all">All Types</option>
              <option value="personal">Personal</option>
              <option value="home">Home</option>
              <option value="auto">Auto</option>
              <option value="student">Student</option>
              <option value="mortgage">Mortgage</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Custom Loan Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount:</label>
            <input 
              type="number" 
              value={customLoan.amount}
              onChange={(e) => setCustomLoan({...customLoan, amount: parseFloat(e.target.value) || 0})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%):</label>
            <input 
              type="number" 
              step="0.1"
              value={customLoan.rate}
              onChange={(e) => setCustomLoan({...customLoan, rate: parseFloat(e.target.value) || 0})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Term (months):</label>
            <input 
              type="number" 
              value={customLoan.term}
              onChange={(e) => setCustomLoan({...customLoan, term: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Custom Loan Results:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(customLoanDetails.monthlyPayment)}</div>
              <div className="text-sm text-gray-600">Monthly Payment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(customLoanDetails.totalPayment)}</div>
              <div className="text-sm text-gray-600">Total Payment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(customLoanDetails.totalInterest)}</div>
              <div className="text-sm text-gray-600">Total Interest</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h3 className="text-2xl font-bold">Available Loan Options</h3>
        </div>
        
        {filteredOptions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h4>
            <p className="text-gray-500">Try adjusting your filters to see more options.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Loan Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Interest Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount Range</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Max Term</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Monthly Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Interest</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOptions.map((option, index) => {
                  const details = calculateLoanDetails(option, filters.amount, Math.min(filters.maxTerm, option.maxTerm));
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900 capitalize">{option.type}</td>
                      <td className="px-6 py-4 text-green-600 font-bold">{option.interestRate}%</td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(option.minAmount)} - {formatCurrency(option.maxAmount)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{option.maxTerm} months</td>
                      <td className="px-6 py-4 font-bold text-blue-600">
                        {formatCurrency(details.monthlyPayment)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{formatCurrency(details.totalInterest)}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => {
                            const token = localStorage.getItem('token');
                            if (token) {
                              window.location.href = `/apply?type=${option.type}`;
                            } else {
                              window.location.href = '/login';
                            }
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all text-sm font-medium"
                        >
                          Apply Now
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanComparison;