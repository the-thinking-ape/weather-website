const request = require('request')
const chalk = require('chalk')

/* Functionality: */
// Takes in coordinates and outputs weather forecast message

const forecast = (latitude, longitude, callback) => {

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
            const weatherIcon = body.current.weather_icons[0]// captures an image icon
            const windSpeed = body.current.wind_speed
            const humidity = body.current.humidity
            const feelslike = body.current.feelslike
            const forecastText = description + '. It is currently ' + temperature + '°C outdoors with a ' + precipitationProbability + '% chance of rain.\n But because of wind speeds of ' + windSpeed + 'km/h and a humidity of ' + humidity + '% it actually feels like ' + feelslike + '°C outside.'
            
            // const forecastText = response.body
            callback(undefined, forecastText, weatherIcon) // no error so pass undefined in that parameter
        }
    })
}

module.exports = forecast
