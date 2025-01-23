const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ensure this points to your DB configuration

router.post('/daily-sale', async (req, res) => {
  const {
    branch,
    cash,
    transfer,
    credit_card,
    voucher,
    other_income,
    expense,
    other_expense,
    cash_in_drawer,
    total,
  } = req.body;

  // Validate input fields
  if (
    branch === undefined ||
    cash === undefined ||
    transfer === undefined ||
    credit_card === undefined ||
    voucher === undefined ||
    other_income === undefined ||
    expense === undefined ||
    other_expense === undefined ||
    cash_in_drawer === undefined ||
    total === undefined
  ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Insert into the database
    const query = `
      INSERT INTO daily_sale (branch, cash, transfer, credit_card, voucher, other_income, expense, other_expense, cash_in_drawer, total)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.execute(query, [
      branch,
      cash,
      transfer,
      credit_card,
      voucher,
      other_income,
      expense,
      other_expense,
      cash_in_drawer,
      total,
    ]);

    res.status(201).json({ message: 'Daily sale submitted successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save daily sale. Please try again.' });
  }
});


module.exports = router;
