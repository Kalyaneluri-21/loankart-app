import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoanForm from './pages/LoanForm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import LoanDetails from './pages/LoanDetails.jsx';
import RepaymentCalendar from './pages/RepaymentCalendar.jsx';
import LoanComparison from './pages/LoanComparison.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  
  if (adminOnly) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<LoanComparison />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/loan/:id" element={<ProtectedRoute><LoanDetails /></ProtectedRoute>} />
          <Route path="/apply" element={<ProtectedRoute><LoanForm /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><RepaymentCalendar /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;