const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dailySaleRoutes = require('./routes/dailySaleRoutes');
const branchRoutes = require('./routes/branchRoutes'); // Adjust path as needed
const userRoutes = require('./routes/userRoutes'); // Adjust path as needed
const salesRoutes = require('./routes/salesRoutes'); // Adjust path as needed

const app = express();
const PORT = 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/branches', branchRoutes);
app.use('/api', userRoutes); // Register userRoutes under '/api'
app.use('/api', salesRoutes);
app.use('/api', dailySaleRoutes);


// Routes
app.use('/api/daily-sale', dailySaleRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
