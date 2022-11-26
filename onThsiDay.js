const request = require('postman-request');
const dashboard_data = ( callback ) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = weekday[date.getDay()];
    const url ='https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/'+month+'/'+day;
    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback({error : 'Unable to get the information!!!'}, undefined);
        } else {
            callback(undefined , {
                date_today: day+'/'+month+' - '+today,
                text_to_be_displayed: response.body.selected[0].text
            });
        }
    });
}

module.exports = dashboard_data;
