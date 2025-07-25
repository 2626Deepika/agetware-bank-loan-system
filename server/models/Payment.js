const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');

function recordPayment(loan_id, amount, payment_type, callback) {
  const payment_id = uuidv4();

  db.run(`INSERT INTO Payments (payment_id, loan_id, amount, payment_type) VALUES (?, ?, ?, ?)`,
    [payment_id, loan_id, amount, payment_type],
    function (err) {
      if (err) return callback(err);

      db.get(`SELECT total_amount, monthly_emi FROM Loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
        if (err || !loan) return callback(err || new Error("Loan not found"));

        db.get(`SELECT SUM(amount) as paid FROM Payments WHERE loan_id = ?`, [loan_id], (err, result) => {
          if (err) return callback(err);
          const paid = result.paid || 0;
          const balance = loan.total_amount - paid;
          const emis_left = Math.ceil(balance / loan.monthly_emi);

          callback(null, {
            payment_id,
            loan_id,
            message: "Payment recorded successfully.",
            remaining_balance: balance,
            emis_left
          });
        });
      });
    });
}

module.exports = { recordPayment };
