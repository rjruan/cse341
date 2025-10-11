/* eslint-env node */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { initDb } = require('./db/connect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS middleware (with your Netlify site)
app.use(
  cors({
    origin: 'https://cse341-contacts-frontend.netlify.app', // frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Z-Key'],
  })
);

// Parse JSON request bodies
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
      console.log(`swagger Docs: http://localhost:${PORT}/api-docs`);
    });
  }
});
