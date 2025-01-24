const express = require('express');
const router = express.Router();
const db = require('../config/db');



  // Get all branches
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM branch';
    const [branches] = await db.execute(query);
    res.status(200).json(branches);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch branches. Please try again later.' });
  }
});

// Add a new branch
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

// Update a branch
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, phone_number } = req.body;

  if (!name || !address || !phone_number) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const query = `
      UPDATE branch
      SET name = ?, address = ?, phone_number = ?
      WHERE id = ?
    `;
    await db.execute(query, [name, address, phone_number, id]);
    res.status(200).json({ message: 'Branch updated successfully!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to update branch. Please try again later.' });
  }
});

// Delete a branch
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM branch WHERE id = ?';
    await db.execute(query, [id]);
    res.status(200).json({ message: 'Branch deleted successfully!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to delete branch. Please try again later.' });
  }
});

module.exports = router;
