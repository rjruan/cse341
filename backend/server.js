const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/professional', (req, res) => {
  const data = {
    title: "Hello, my name is Ruby Ruan.",
    header: "Welcome to my portfolio.",
    description: "I'm a awesome student at BYU-Idaho.",
    links: [
      { text: "My Portfolio", url: "https://rubyruan.framer.website/" },
      { text: "Linkedin", url: "https://www.linkedin.com/in/rubyyyy/" }
    ],

    image: "../IMG_6114 2.JPG"
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
