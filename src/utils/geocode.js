const request = require('request')

/* Functionality */ 
// Takes in name of an address in text form
// Makes HTTP request to mapbox API
// Returns the corresponding latitude, longitude and detailed place name in an object

const geocode = (address,callback) => { 

    // encodeURIComponent() returns a string replacing all special characters with safe chars
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hlZmxvcmQiLCJhIjoiY2thc3NkMmVyMGk0NzJzbW83ZjJybGNieCJ9.bwLErtn2mVKLbp44l6CdmA&limit=1'

    request({ url, json:true}, (error, {body})=>{ // request({options object}, function to run), options object specifies a set of 'named' parameters passed into function. Here request function has optional parameters url and json.
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('Location with that name not found. Try spell checking or typing a new place.', undefined) // you don't have to write 'undefined' , it's implicity written in
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data) // undefined for error so no error is found
        }
    })
}


// make it public so others can require (import) this as a library
module.exports = geocode // this passes in the only function
