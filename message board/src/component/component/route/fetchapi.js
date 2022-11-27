const express = require('express');
const onthisday = require('../controller/onThisDay');
const thought_of_the_day = require('../controller/thoughtOfTheDay');
// const app = express();
const router = new express.Router();

router.get('/dashboard-data', (req, res) => {

    thought_of_the_day((error, data) => {
        if(error){
            return res.send({ error: 'something went wrong' });
        }  
        onthisday((error ,thisdaydata) => {
            if(error){
                return res.send({ error: 'something went wrong' });
            }  
           res.send({ thoughtoftheday : {
            thought : data.thought_of_the_day[0].q,
               author : data.thought_of_the_day[0].a
           }, thisdaydata
           });
        });
    })
    });

    module.exports = router ;