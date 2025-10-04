const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professional');

// GET /professional/
router.get('/', professionalController.getData);

module.exports = router;
