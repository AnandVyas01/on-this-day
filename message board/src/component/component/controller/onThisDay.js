const request = require('postman-request');


const dashboard_data = ( callback ) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = weekday[date.getDay()];
    const on_this_day_url ='https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/'+month+'/'+day;
    
    request({ url: on_this_day_url, json: true }, (error, response) => {
        if(error){
            callback({error : 'Unable to get the information!!!'}, undefined);
        } else {
            const with_images = []
            for(let i = 0; i < 6; i++){
            if(response.body.selected[i].pages[0].thumbnail?.source || response.body.selected[i].pages[0].originalimage?.source){
                with_images.push({
                    text_to_be_displayed: response.body.selected[i].text,
                    thumbnail : response.body.selected[i].pages[0].thumbnail.source,
                    orignal_image : response.body.selected[i].pages[0].originalimage.source,
                    details_url : response.body.selected[i].pages[0].content_urls
                });
            } else {
                with_images.push({
                    text_to_be_displayed: response.body.selected[i].text,
                    details_url : response.body.selected[i].pages[0].content_urls
                });
                return callback(undefined , [{
                    date_today : day+'/'+month+' - '+today
                }, with_images]);
            }
            }
            
        }
    });
    
}


module.exports = dashboard_data;
