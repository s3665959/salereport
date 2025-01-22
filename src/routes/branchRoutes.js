const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add new branch
router.post('/', async (req, res) => {
  const { name, address, phone_number } = req.body;

  if (!name || !address || !phone_number) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const query = `
      INSERT INTO branch (name, address, phone_number)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, address, phone_number]);

    res.status(201).json({ message: 'Branch added successfully!', id: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to add branch. Please try again later.' });
  }
});

// Get all branches
router.get('/', async (req, res) => {
    try {
      const query = 'SELECT id, name FROM branch';
      const [branches] = await db.execute(query);
      res.status(200).json(branches);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to fetch branches. Please try again later.' });
    }
  });

module.exports = router;
