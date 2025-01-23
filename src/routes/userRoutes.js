const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

router.post('/register', async (req, res) => {
  const { username, password, branch } = req.body;

  if (!username || !password || !branch) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = `
      INSERT INTO users (username, password, branch, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [username, hashedPassword, branch, 'user']);

    res.status(201).json({ message: 'User registered successfully!', id: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
});


// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Query to get user details
    const query = `
      SELECT id, username, branch, password FROM users WHERE username = ?
    `;
    const [users] = await db.execute(query, [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const user = users[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Return user details (excluding password)
    const { id, username: userName, branch } = user;
    res.status(200).json({ id, username: userName, branch });
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
