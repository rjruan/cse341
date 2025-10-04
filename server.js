/* eslint-env node */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./db/connect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes AFTER middleware
const contactsRoute = require('./routes/contacts');
const professionalRoute = require('./routes/professional');

// Mount routes
app.use('/contacts', contactsRoute);
app.use('/professional', professionalRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server only after DB connection
initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
