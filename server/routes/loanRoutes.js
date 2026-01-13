const express = require('express');
const { createLoan, getLoans, getLoanById, updateLoan, applyLoan, getLoanOptions } = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/options', getLoanOptions);
router.use(authMiddleware);

router.post('/apply', applyLoan);
router.post('/', createLoan);
router.get('/', getLoans);
router.get('/user/:id', getLoans);
router.get('/:id', getLoanById);
router.put('/:id', updateLoan);

module.exports = router;