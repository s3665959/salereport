const { insertDailySale } = require('../models/dailySaleModel');

exports.submitDailySale = async (req, res) => {
  try {
    await insertDailySale(req.body);
    res.status(200).json({ message: 'Daily sale submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting daily sale.' });
  }
};
