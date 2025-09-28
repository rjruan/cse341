const express = require('express');
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const allContacts = await db.collection('contacts').find().toArray();
    res.json(allContacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET contact by id
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
