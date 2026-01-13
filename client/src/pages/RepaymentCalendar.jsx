import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import PaymentSummaryModal from '../components/PaymentSummaryModal.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { apiCall } from '../config/api.js';

const RepaymentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    if (selectedLoan) {
      fetchPayments(selectedLoan);
    }
  }, [selectedLoan]);

  const fetchLoans = async () => {
    try {
      const response = await apiCall('/api/loans', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoans(data.filter(loan => loan.status === 'approved' || loan.status === 'active'));
        if (data.length > 0) {
          setSelectedLoan(data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const fetchPayments = async (loanId) => {
    try {
      const response = await apiCall(`/api/payments/${loanId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const getPaymentForDate = (date) => {
    return payments.find(payment => {
      const paymentDate = new Date(payment.dueDate);
      return paymentDate.toDateString() === date.toDateString();
    });
  };

  const getTileClassName = ({ date }) => {
    const payment = getPaymentForDate(date);
    if (!payment) return '';
    
    switch (payment.status) {
      case 'paid': return 'payment-paid';
      case 'overdue': return 'payment-overdue';
      case 'upcoming': return 'payment-upcoming';
      default: return '';
    }
  };

  const getTileContent = ({ date }) => {
    const payment = getPaymentForDate(date);
    if (!payment) return null;
    
    const statusEmoji = {
      'paid': '🟢',
      'overdue': '🔴',
      'upcoming': '🟡'
    };
    
    return (
      <div style={{ fontSize: '12px', textAlign: 'center' }}>
        {statusEmoji[payment.status]}
      </div>
    );
  };

  const handleDateClick = (date) => {
    const payment = getPaymentForDate(date);
    if (payment) {
      setSelectedPayment(payment);
      setModalOpen(true);
    }
    setSelectedDate(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
      <h1>Repayment Calendar</h1>
      
      {loans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No active loans found</h3>
          <p>Apply for a loan to see your repayment schedule.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Select Loan:</label>
            <select 
              value={selectedLoan}
              onChange={(e) => setSelectedLoan(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              {loans.map(loan => (
                <option key={loan._id} value={loan._id}>
                  {loan.type} Loan - {formatCurrency(loan.amount)}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>🟢</span>
              <span style={{ fontSize: '14px' }}>Paid</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>🟡</span>
              <span style={{ fontSize: '14px' }}>Upcoming</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>🔴</span>
              <span style={{ fontSize: '14px' }}>Overdue</span>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              onClickDay={handleDateClick}
              tileClassName={getTileClassName}
              tileContent={getTileContent}
              style={{ width: '100%' }}
            />
          </div>
          
          {payments.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Payment Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ background: '#d4edda', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>
                    {payments.filter(p => p.status === 'paid').length}
                  </div>
                  <div style={{ color: '#155724' }}>Payments Made</div>
                </div>
                <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
                    {payments.filter(p => p.status === 'upcoming').length}
                  </div>
                  <div style={{ color: '#856404' }}>Upcoming Payments</div>
                </div>
                <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#721c24' }}>
                    {payments.filter(p => p.status === 'overdue').length}
                  </div>
                  <div style={{ color: '#721c24' }}>Overdue Payments</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <PaymentSummaryModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        paymentData={selectedPayment}
      />
      
      <style jsx>{`
        .react-calendar {
          width: 100% !important;
          border: none !important;
          font-family: inherit !important;
        }
        
        .react-calendar__tile {
          position: relative !important;
          height: 60px !important;
        }
        
        .react-calendar__tile--active {
          background: #007bff !important;
          color: white !important;
        }
        
        .payment-paid {
          background-color: #d4edda !important;
        }
        
        .payment-upcoming {
          background-color: #fff3cd !important;
        }
        
        .payment-overdue {
          background-color: #f8d7da !important;
        }
      `}</style>
      </div>
      <Footer />
    </div>
  );
};

export default RepaymentCalendar;