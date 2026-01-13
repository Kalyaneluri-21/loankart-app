const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  term: { type: Number, required: true },
  type: { type: String, enum: ['personal', 'home', 'auto', 'student', 'mortgage'], required: true },
  status: { type: String, enum: ['submitted', 'review', 'approved', 'rejected', 'active'], default: 'submitted' },
  progress: { type: String, enum: ['Submitted', 'Under Review', 'Approved', 'Rejected'], default: 'Submitted' },
  monthlyPayment: Number,
  startDate: Date,
  endDate: Date,

  income: Number,
  employment: String,
  purpose: String
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);