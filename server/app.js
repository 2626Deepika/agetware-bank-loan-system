const express = require('express');
const app = express();
const loanRoutes = require('./routes/loanRoutes');

app.use(express.json());
app.use('/api/v1', loanRoutes);

module.exports = app;
