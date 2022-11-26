const express = require('express');
const onthisday = require('./onThsiDay');

const app = express();

const port = process.env.PORT || 3000;

app.get('/dashboard-data', (req, res) => {
onthisday((error ,data) => {
    if(error){
        return res.send({ error: 'something went wrong' });
    }  
   res.send({ 
       on_this_day : data.text_to_be_displayed,
       day_today : data.date_today
    })
});
});

app.listen(port, ()=>{
    console.log('server is up');
});