const awesomeFunction = (req, res, next) =>{
    res.json('Leticia Hurtado')
};

const returnAnotehrPerson = (req, res, next) =>{
    res.json('Super awesome person')
};

module.exports = {awesomeFunction, returnAnotehrPerson};