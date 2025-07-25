const express = require('express');
const router = express.Router();
const { createLoan } = require('../models/Loan');
const { recordPayment } = require('../models/Payment');
const { getLedger } = require('../models/Ledger');
const db = require('../db/db');

// LEND
router.post('/loans', (req, res) => {
  const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;
  createLoan(customer_id, loan_amount, loan_period_years, interest_rate_yearly, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
});

// PAYMENT
router.post('/loans/:loan_id/payments', (req, res) => {
  const { loan_id } = req.params;
  const { amount, payment_type } = req.body;
  recordPayment(loan_id, amount, payment_type, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
});

// LEDGER
router.get('/loans/:loan_id/ledger', (req, res) => {
  const { loan_id } = req.params;
  getLedger(loan_id, (err, result) => {
    if (err) return res.status(404).json({ error: err.message });
    res.status(200).json(result);
  });
});

// ACCOUNT OVERVIEW
router.get('/customers/:customer_id/overview', (req, res) => {
  const { customer_id } = req.params;
  db.all(`SELECT * FROM Loans WHERE customer_id = ?`, [customer_id], (err, loans) => {
    if (err) return res.status(500).json({ error: err.message });

    const overview = loans.map(loan => {
      return new Promise((resolve) => {
        db.get(`SELECT SUM(amount) as paid FROM Payments WHERE loan_id = ?`, [loan.loan_id], (err, result) => {
          const paid = result?.paid || 0;
          const emis_left = Math.ceil((loan.total_amount - paid) / loan.monthly_emi);
          const interest = loan.total_amount - loan.principal_amount;
          resolve({
            loan_id: loan.loan_id,
            principal: loan.principal_amount,
            total_amount: loan.total_amount,
            total_interest: interest,
            emi_amount: loan.monthly_emi,
            amount_paid: paid,
            emis_left
          });
        });
      });
    });

    Promise.all(overview).then(loansData => {
      res.status(200).json({
        customer_id,
        total_loans: loans.length,
        loans: loansData
      });
    });
  });
});

module.exports = router;
