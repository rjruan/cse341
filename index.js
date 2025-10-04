const awesomeFunction = (req, res) => {
  res.json('Leticia Hurtado');
};

const returnAnotehrPerson = (req, res) => {
  res.json('Super awesome person');
};

module.exports = { awesomeFunction, returnAnotehrPerson };
