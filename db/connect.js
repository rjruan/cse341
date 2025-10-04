/* eslint-env node */
const { MongoClient } = require('mongodb');

let _db = null;

/**
 * Initialize MongoDB connection
 * @param {Function} callback
 */
const initDb = (callback) => {
  if (_db) {
    console.log('Database already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db('cse341'); // Replace with your actual DB name
      console.log('Connected to MongoDB!');
      callback(null, _db);
    })
    .catch((err) => callback(err));
};

/**
 * Get the database instance
 * @returns {Db}
 */
const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };
