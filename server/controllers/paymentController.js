const Payment = require('../models/Payment');
const Loan = require('../models/Loan');

const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.loanId, userId: req.user.userId });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    
    const payments = await Payment.find({ loanId: req.params.loanId });
    res.json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const processPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    
    payment.status = 'paid';
    payment.paidDate = new Date();
    payment.paymentMethod = req.body.paymentMethod || 'online';
    
    await payment.save();
    res.json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPayment, getPayments, updatePayment, processPayment };