const Loan = require('../models/Loan');
const Payment = require('../models/Payment');

const applyLoan = async (req, res) => {
  try {
    // Check for existing active loans
    const existingLoans = await Loan.find({ 
      userId: req.user.userId, 
      status: { $in: ['submitted', 'review', 'approved', 'active'] }
    });
    
    if (existingLoans.length > 0) {
      // Check if user has made at least one payment
      const paidPayments = await Payment.find({ 
        loanId: { $in: existingLoans.map(loan => loan._id) },
        status: 'paid'
      });
      
      if (paidPayments.length === 0) {
        return res.status(400).json({ 
          error: 'You must make at least one EMI payment before applying for another loan' 
        });
      }
    }
    
    const loanData = { 
      ...req.body, 
      userId: req.user.userId,
      monthlyPayment: calculateMonthlyPayment(req.body.amount, req.body.interestRate, req.body.term)
    };
    
    const loan = new Loan(loanData);
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLoanOptions = async (req, res) => {
  try {
    const options = [
      { type: 'personal', minAmount: 50000, maxAmount: 4000000, interestRate: 10.5, maxTerm: 60 },
      { type: 'education', minAmount: 100000, maxAmount: 15000000, interestRate: 8.5, maxTerm: 180 },
      { type: 'home', minAmount: 500000, maxAmount: 100000000, interestRate: 8.75, maxTerm: 360 },
      { type: 'business', minAmount: 100000, maxAmount: 7500000, interestRate: 12, maxTerm: 84 }
    ];
    res.json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLoan = async (req, res) => {
  try {
    const loanData = { ...req.body, userId: req.user.userId };
    const loan = new Loan(loanData);
    await loan.save();
    
    if (loan.status === 'approved') {
      await generatePayments(loan);
    }
    
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLoans = async (req, res) => {
  try {
    console.log('Getting loans for user:', req.user.userId);
    const loans = await Loan.find({ userId: req.user.userId });
    console.log('Found loans:', loans.length);
    res.json(loans || []);
  } catch (error) {
    console.error('Error in getLoans:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch loans' });
  }
};

const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    
    if (req.body.status === 'approved' && loan.status !== 'approved') {
      await generatePayments(loan);
    }
    
    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calculateMonthlyPayment = (amount, rate, term) => {
  const r = rate / 100 / 12;
  return (amount * r) / (1 - Math.pow(1 + r, -term));
};

const generatePayments = async (loan) => {
  try {
    const payments = [];
    const startDate = new Date();
    
    for (let i = 1; i <= loan.term; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      
      payments.push({
        loanId: loan._id,
        amount: loan.monthlyPayment,
        dueDate,
        paymentNumber: i,
        status: 'upcoming'
      });
    }
    
    await Payment.insertMany(payments);
  } catch (error) {
    console.error('Error generating payments:', error);
    throw error;
  }
};

module.exports = { createLoan, getLoans, getLoanById, updateLoan, applyLoan, getLoanOptions };