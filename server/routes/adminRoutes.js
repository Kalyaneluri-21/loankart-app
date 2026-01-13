const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Loan = require('../models/Loan');
const User = require('../models/User');
const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

// Get all loans
router.get('/loans', async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId', 'firstName lastName email');
    const loansWithUserData = loans.map(loan => ({
      ...loan.toObject(),
      firstName: loan.userId.firstName,
      lastName: loan.userId.lastName,
      email: loan.userId.email
    }));
    res.json(loansWithUserData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update loan status
router.put('/loans/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status, progress: status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Under Review' },
      { new: true }
    );
    
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    
    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;