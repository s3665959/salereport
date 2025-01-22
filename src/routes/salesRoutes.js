const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all sales
router.get('/sales', async (req, res) => {
  try {
    const query = `
      SELECT id, branch, time_date, cash, transfer, credit_card, voucher, other_income, expense, other_expense, cash_in_drawer, total
      FROM daily_sale
      ORDER BY time_date DESC
    `;
    const [sales] = await db.execute(query);
    res.status(200).json(sales);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch sales data.' });
  }
});

module.exports = router;
