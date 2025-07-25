# 💰 Agetware Bank Loan System Backend

This is a backend system for managing bank loans — built as part of the Agetware Backend Assignment.

## 📌 Features Implemented

- ✅ **LEND** – Create a loan for a customer  
- ✅ **PAYMENT** – Make EMI or lump-sum payments  
- ✅ **LEDGER** – View loan transactions & status  
- ✅ **ACCOUNT OVERVIEW** – See all loans for a customer

---

## 🧠 Tech Stack

- Node.js
- Express.js
- SQLite3
- UUID (for unique IDs)
- dotenv (for config)
- REST Client (VS Code) / Postman for testing

---

## 🚀 How to Run the Project

```bash
npm install
node server/server.js
```

📍 Server will run at:  
`http://localhost:5000`

---

## 📬 API Endpoints

### 1️⃣ LEND a Loan  
**POST** `/api/v1/loans`

**Request Body**:
```json
{
  "customer_id": "cust001",
  "loan_amount": 10000,
  "loan_period_years": 2,
  "interest_rate_yearly": 10
}
```

**Response**:
```json
{
  "loan_id": "uuid",
  "customer_id": "cust001",
  "total_amount_payable": 12000,
  "monthly_emi": 500
}
```

---

### 2️⃣ PAYMENT  
**POST** `/api/v1/loans/:loan_id/payments`

**Request Body**:
```json
{
  "amount": 500,
  "payment_type": "EMI"
}
```

**Response**:
```json
{
  "payment_id": "uuid",
  "loan_id": "uuid",
  "message": "Payment recorded successfully.",
  "remaining_balance": 11000,
  "emis_left": 22
}
```

---

### 3️⃣ LEDGER  
**GET** `/api/v1/loans/:loan_id/ledger`

**Response**:
```json
{
  "loan_id": "uuid",
  "customer_id": "cust001",
  "principal": 10000,
  "total_amount": 12000,
  "monthly_emi": 500,
  "amount_paid": 1000,
  "balance_amount": 11000,
  "emis_left": 22,
  "transactions": [
    {
      "payment_id": "uuid",
      "amount": 500,
      "payment_type": "EMI",
      "payment_date": "timestamp"
    }
  ]
}
```

---

### 4️⃣ ACCOUNT OVERVIEW  
**GET** `/api/v1/customers/:customer_id/overview`

**Response**:
```json
{
  "customer_id": "cust001",
  "total_loans": 1,
  "loans": [
    {
      "loan_id": "uuid",
      "principal": 10000,
      "total_amount": 12000,
      "total_interest": 2000,
      "emi_amount": 500,
      "amount_paid": 1000,
      "emis_left": 22
    }
  ]
}
```

---

## 🧪 API Testing Options

You can test using either of these:

- ✅ `test-api.http` file (with REST Client extension in VS Code)
- ✅ Postman (API testing tool)

---

## 👩‍💻 Author

**Deepika Vasam**  
GitHub: [@2626Deepika](https://github.com/2626Deepika)
