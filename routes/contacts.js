/* eslint-env node */
const express = require('express');
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: List of all contacts
 */
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contacts').insertOne(newContact);

    res.status(201).json({ message: 'Contact created', id: result.insertedId });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Contact updated
 */
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db
      .collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedContact });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated' });
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
