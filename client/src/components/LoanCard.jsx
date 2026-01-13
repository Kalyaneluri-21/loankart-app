import React from 'react';
import { motion } from 'framer-motion';

const LoanCard = ({ loan }) => {
  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-bold text-white capitalize';
    switch (status) {
      case 'submitted': return `${baseClasses} bg-yellow-500`;
      case 'review': return `${baseClasses} bg-blue-500`;
      case 'approved': return `${baseClasses} bg-green-500`;
      case 'rejected': return `${baseClasses} bg-red-500`;
      case 'active': return `${baseClasses} bg-blue-600`;
      default: return `${baseClasses} bg-gray-500`;
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'submitted': return 25;
      case 'review': return 50;
      case 'approved': return 75;
      case 'active': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-500';
      case 'review': return 'bg-blue-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'active': return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold capitalize m-0">{loan.type} Loan</h3>
        <span className={getStatusBadge(loan.status)}>
          {loan.status}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">{getProgressPercentage(loan.status)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ease-out ${getProgressColor(loan.status)}`}
            style={{ width: `${getProgressPercentage(loan.status)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-lg font-bold text-gray-900">Amount: {formatCurrency(loan.amount)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
        <div>Interest Rate: {loan.interestRate}%</div>
        <div>Term: {loan.term} months</div>
        {loan.monthlyPayment && (
          <div className="col-span-2">Monthly Payment: {formatCurrency(loan.monthlyPayment)}</div>
        )}
      </div>
      
      <div className="text-right">
        <motion.button 
          onClick={() => {
            window.location.href = `/loan/${loan._id}`;
          }}
          className="px-4 py-2 bg-blue-600 text-white text-xs rounded"
          whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoanCard;