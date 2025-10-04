const { getDb } = require('../db/connect');

const getData = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('users').find().toArray(); // Replace 'users' with your actual collection name
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching professional data:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getData };
