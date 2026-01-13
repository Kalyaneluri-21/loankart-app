const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: Date,
  status: { type: String, enum: ['upcoming', 'paid', 'overdue'], default: 'upcoming' },
  paymentMethod: String,
  paymentNumber: Number
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);