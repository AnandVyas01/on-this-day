const request = require('postman-request');

const thought_of_the_day = (callback) => {
    const quotes_url = 'https://zenquotes.io/api/today';
    request({url:quotes_url, json:true }, (error, response) => {
        if(error){
            callback({error : 'Unable to get the information!!!'}, undefined);
        } else {
            callback(undefined, {
                thought_of_the_day : response.body
            })
        }
    })
}

module.exports = thought_of_the_day;