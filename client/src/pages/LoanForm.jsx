import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar.jsx';
import Toast from '../components/Toast.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { validateRequired, validateAmount, validateEmail, validateIncome } from '../utils/validators.jsx';
import { calcMonthlyPayment } from '../utils/calculator.jsx';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../config/api.js';

const LoanForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    term: '',
    interestRate: 8.5,
    income: '',
    employment: '',
    purpose: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);


  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!validateRequired(formData.type)) newErrors.type = 'Loan type is required';
      if (!validateAmount(formData.amount, 1000)) newErrors.amount = 'Amount must be at least ₹1,000';
      if (!validateAmount(formData.term, 6, 360)) newErrors.term = 'Term must be between 6-360 months';
    }
    
    if (step === 2) {
      if (!validateIncome(formData.income)) newErrors.income = 'Valid income is required';
      if (!validateRequired(formData.employment)) newErrors.employment = 'Employment status is required';
      if (!validateRequired(formData.purpose)) newErrors.purpose = 'Loan purpose is required';
    }
    
    if (step === 3) {
      if (!validateRequired(formData.firstName)) newErrors.firstName = 'First name is required';
      if (!validateRequired(formData.lastName)) newErrors.lastName = 'Last name is required';
      if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    try {
      const response = await apiCall('/api/loans/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToast({ message: 'Loan application submitted successfully!', type: 'success' });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else if (response.status === 400 && data.error && data.error.includes('EMI payment')) {
        setToast({ 
          message: 'For additional loans, please contact your bank agent or make at least one EMI payment on your existing loan.', 
          type: 'warning' 
        });
      } else {
        setToast({ message: data.error || 'Error submitting application', type: 'error' });
      }
    } catch (error) {
      console.error('Loan application error:', error);
      setToast({ message: `Application failed: ${error.message}`, type: 'error' });
    }
  };

  const monthlyPayment = formData.amount && formData.term ? 
    calcMonthlyPayment(parseFloat(formData.amount), formData.interestRate, parseInt(formData.term)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
      <ProgressBar currentStep={currentStep} totalSteps={3} />
      
      <form onSubmit={handleSubmit} className="mt-6">
        {currentStep === 1 && (
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type:</label>
              <select 
                value={formData.type} 
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select loan type</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="auto">Auto Loan</option>
                <option value="education">Education Loan</option>
                <option value="business">Business Loan</option>
              </select>
              {errors.type && <span className="text-red-500 text-xs mt-1 block">{errors.type}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹):</label>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.amount && <span className="text-red-500 text-xs mt-1 block">{errors.amount}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term (months):</label>
              <input 
                type="number" 
                value={formData.term}
                onChange={(e) => setFormData({...formData, term: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.term && <span className="text-red-500 text-xs mt-1 block">{errors.term}</span>}
            </div>
            
            {monthlyPayment > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-lg font-semibold text-blue-900">Estimated Monthly Payment: ₹{monthlyPayment.toLocaleString('en-IN')}</div>
              </div>
            )}
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹):</label>
              <input 
                type="number" 
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.income && <span className="text-red-500 text-xs mt-1 block">{errors.income}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status:</label>
              <select 
                value={formData.employment}
                onChange={(e) => setFormData({...formData, employment: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select employment status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
              </select>
              {errors.employment && <span className="text-red-500 text-xs mt-1 block">{errors.employment}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose:</label>
              <input 
                type="text" 
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.purpose && <span className="text-red-500 text-xs mt-1 block">{errors.purpose}</span>}
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name:</label>
              <input 
                type="text" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name:</label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.lastName && <span className="text-red-500 text-xs mt-1 block">{errors.lastName}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-8">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={handlePrev} 
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button 
              type="button" 
              onClick={handleNext} 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
            >
              Next
            </button>
          ) : (
            <button 
            type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto font-medium"
            >
              Submit Application
            </button>
          )}
        </div>
      </form>
      
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

export default LoanForm;