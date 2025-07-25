const db = require('../db/db');

function getLedger(loan_id, callback) {
  db.get(`SELECT * FROM Loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
    if (err || !loan) return callback(err || new Error("Loan not found"));

    db.all(`SELECT * FROM Payments WHERE loan_id = ? ORDER BY payment_date ASC`, [loan_id], (err, transactions) => {
      if (err) return callback(err);

      const totalPaid = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const balance = loan.total_amount - totalPaid;
      const emis_left = Math.ceil(balance / loan.monthly_emi);

      callback(null, {
        loan_id: loan.loan_id,
        customer_id: loan.customer_id,
        principal: loan.principal_amount,
        total_amount: loan.total_amount,
        monthly_emi: loan.monthly_emi,
        amount_paid: totalPaid,
        balance_amount: balance,
        emis_left,
        transactions
      });
    });
  });
}

module.exports = { getLedger };
