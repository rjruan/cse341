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

// Middleware
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Allow the frontend app (Netlify) to connect
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


// Import routes AFTER middleware
const contactsRoute = require('./routes/contacts');
const professionalRoute = require('./routes/professional');

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger Docs available at: http://localhost:${PORT}/api-docs`);
    });
  }
});
