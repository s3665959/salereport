const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, branch } = req.body;

  // Validate input
  if (!username || !password || !branch) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Insert user into the users table
    const query = `
      INSERT INTO users (username, password, branch, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [username, password, branch, 'user']);

    res.status(201).json({ message: 'User registered successfully!', id: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Query to check if the user exists
    const query = `
      SELECT username, branch FROM users WHERE username = ? AND password = ?
    `;
    const [users] = await db.execute(query, [username, password]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Return user details
    res.status(200).json(users[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to login. Please try again later.' });
  }
});

// Get logged-in user details
router.get('/user', async (req, res) => {
  try {
    // Ensure userId exists in session
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized: No user logged in.' });
    }

    const query = 'SELECT username, branch FROM users WHERE id = ?';
    const [users] = await db.execute(query, [req.session.userId]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch user information.' });
  }
});



module.exports = router;
