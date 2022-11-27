const express = require('express');
const fetchapi = require('../route/fetchapi')


const app = express();


const port = process.env.PORT || 3000;

app.use(fetchapi)

app.listen(port, ()=>{
    console.log('server is up');
});