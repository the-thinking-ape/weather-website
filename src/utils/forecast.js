const request = require('request')
const chalk = require('chalk')

/* Functionality: */
// Takes in coordinates and outputs weather forecast message

const forecast = (latitude, longitude, callback) => {

    // V.1 works  w/ data-api
    // const url = 'http://api.weatherstack.com/current?access_key=040bab27a93fb7918e834d73989d7c5e&query='+ encodeURIComponent(data.latitude) + ',' + encodeURIComponent(data.longitude) + '&units=m' //dynamic URL inputs lat and long
    const url = 'http://api.weatherstack.com/current?access_key=040bab27a93fb7918e834d73989d7c5e&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m' //dynamic URL inputs lat and long

    request({url, json:true}, (error, { body } )=> {  // used shorthand to turn url:url to url. Also destructured response to {body} since it's the only property we r using of it.

        if(error){ // low-level error
            callback(chalk.red.bold('Unable to connect to location services!'), undefined)
        }else if(body.error){
            callback(chalk.red.bold('Coordinate error. Location not found.'), undefined)
        } else {

            // format text 
            // const place = chalk.yellow.italic(response.body.location.name + ', ' + response.body.location.country)
            const temperature =  body.current.temperature
            const precipitationProbability = body.current.precip * 100
            const description = body.current.weather_descriptions[0]
            const forecastText = description + '. It is currently ' + temperature + '°C outdoors and with a ' + precipitationProbability + '% chance of rain. '
            
            // const forecastText = response.body
            callback(undefined, forecastText) // no error so pass undefined in that parameter
        }
    })
}

module.exports = forecast
