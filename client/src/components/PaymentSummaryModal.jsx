import React from 'react';
import { apiCall } from '../config/api.js';

const PaymentSummaryModal = ({ isOpen, onClose, paymentData }) => {
  if (!isOpen || !paymentData) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#28a745';
      case 'overdue': return '#dc3545';
      case 'upcoming': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const handlePayNow = async () => {
    try {
      const response = await apiCall(`/api/payments/${paymentData._id}/pay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentMethod: 'online' })
      });
      
      if (response.ok) {
        alert('Payment processed successfully!');
        onClose();
        window.location.reload();
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal" style={{
        background: 'white',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Payment Details</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '20px',
            color: 'white',
            background: getStatusColor(paymentData.status),
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            {paymentData.status}
          </div>
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 'bold' }}>Payment Amount:</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                {formatCurrency(paymentData.amount)}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 'bold' }}>Due Date:</span>
              <span>{formatDate(paymentData.dueDate)}</span>
            </div>
            
            {paymentData.paymentNumber && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ fontWeight: 'bold' }}>Payment Number:</span>
                <span>#{paymentData.paymentNumber}</span>
              </div>
            )}
            
            {paymentData.paidDate && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ fontWeight: 'bold' }}>Paid Date:</span>
                <span>{formatDate(paymentData.paidDate)}</span>
              </div>
            )}
            
            {paymentData.paymentMethod && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ fontWeight: 'bold' }}>Payment Method:</span>
                <span style={{ textTransform: 'capitalize' }}>{paymentData.paymentMethod}</span>
              </div>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              background: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          
          {paymentData.status === 'upcoming' && (
            <button 
              onClick={handlePayNow}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Pay Now
            </button>
          )}
          
          {paymentData.status === 'overdue' && (
            <button 
              onClick={handlePayNow}
              style={{
                padding: '10px 20px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Pay Overdue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryModal;