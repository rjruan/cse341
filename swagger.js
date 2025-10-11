const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API documentation for CSE 341 Contacts project'
    },
    servers: [
      { url: 'https://cse341-f5tf.onrender.com', description: 'Render deployment' },
      { url: 'http://localhost:8080/', description: 'Local server' }
    ]
  },
  apis: ['./routes/*.js'] 
};

module.exports = swaggerJSDoc(options);
