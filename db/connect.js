/* eslint-env node */
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      _db = client.db('cse341');
      console.log('Connected to MongoDB!');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };
