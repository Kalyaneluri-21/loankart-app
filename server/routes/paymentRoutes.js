const express = require('express');
const { createPayment, getPayments, updatePayment, processPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', createPayment);
router.get('/:loanId', getPayments);
router.get('/loan/:loanId', getPayments);
router.put('/:id', updatePayment);
router.post('/:id/pay', processPayment);

module.exports = router;