const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: String,
  address: String,
  creditScore: Number,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  googleId: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);