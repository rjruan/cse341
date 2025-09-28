const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./db/connect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// routes
const contactsRoute = require('./routes/contacts');
app.use('/contacts', contactsRoute);

// root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/professional', (req, res) => {
  const data = {
    title: "Hello, my name is Ruby Ruan.",
    header: "Welcome to my portfolio.",
    description: "I'm an awesome student at BYU-Idaho.",
    links: [
      { text: "My Portfolio", url: "https://rubyruan.framer.website/" },
      { text: "LinkedIn", url: "https://www.linkedin.com/in/rubyyyy/" }
    ],
    image: "../IMG_6114 2.JPG"
  };
  res.json(data);
});


initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }
});
