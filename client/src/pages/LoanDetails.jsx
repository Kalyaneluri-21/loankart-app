import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Toast from '../components/Toast.jsx';
import { apiCall } from '../config/api.js';

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchLoanDetails();
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      const response = await apiCall(`/api/loans/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLoan(data);
      } else {
        setToast({ message: 'Error fetching loan details', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Network error', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading loan details...</div>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan Not Found</h2>
            <p className="text-gray-600 mb-6">The loan you're looking for doesn't exist or you don't have access to it.</p>
            <a href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{loan.type} Loan Details</h1>
            <p className="text-gray-600 mt-2">Application ID: {loan._id}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(loan.status)}`}>
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </span>
        </div>

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Loan Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Type:</span>
                  <span className="font-semibold capitalize">{loan.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(loan.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{loan.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Term:</span>
                  <span className="font-semibold">{loan.term} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(loan.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">{formatCurrency(loan.monthlyPayment * loan.term)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{loan.firstName} {loan.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{loan.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-semibold">{formatCurrency(loan.income)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment:</span>
                  <span className="font-semibold capitalize">{loan.employment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-semibold">{loan.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applied On:</span>
                  <span className="font-semibold">{new Date(loan.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(loan.monthlyPayment)}</div>
              <div className="text-sm text-gray-600">Monthly EMI</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(loan.monthlyPayment * loan.term)}</div>
              <div className="text-sm text-gray-600">Total Payable</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency((loan.monthlyPayment * loan.term) - loan.amount)}</div>
              <div className="text-sm text-gray-600">Total Interest</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/dashboard" 
            className="px-8 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 text-center font-medium"
          >
            Back to Dashboard
          </a>
          {(loan.status === 'approved' || loan.status === 'active') && (
            <a 
              href="/calendar" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all text-center font-medium"
            >
              View Payment Schedule
            </a>
          )}
        </div>

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

export default LoanDetails;