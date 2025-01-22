const db = require('../config/db');

const insertDailySale = (data) => {
  const { timeDate, branch, cash, transfer, creditCard, expense, cashInDrawer, total } = data;
  return db.execute(
    'INSERT INTO daily_sale (time_date, branch, cash, transfer, credit_card, expense, cash_in_drawer, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [timeDate, branch, cash, transfer, creditCard, expense, cashInDrawer, total]
  );
};

module.exports = { insertDailySale };
