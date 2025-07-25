const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');

function createLoan(customer_id, principal, years, interestRate, callback) {
  const interest = principal * years * (interestRate / 100);
  const totalAmount = principal + interest;
  const monthlyEMI = totalAmount / (years * 12);
  const loan_id = uuidv4();

  const query = `INSERT INTO Loans (loan_id, customer_id, principal_amount, total_amount, interest_rate, loan_period_years, monthly_emi, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [loan_id, customer_id, principal, totalAmount, interestRate, years, monthlyEMI, 'ACTIVE'], function (err) {
    if (err) return callback(err);
    callback(null, { loan_id, customer_id, total_amount_payable: totalAmount, monthly_emi: monthlyEMI });
  });
}

module.exports = { createLoan };
