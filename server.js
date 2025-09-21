var express = require('express');
var app = express();
const port = process.env.PORT || 3000

app.use('/', require('./routes/index'))

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
