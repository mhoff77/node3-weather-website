const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d8cfc8821e5503f9f270bcad912d5e4b&query=' + latitude + ',' + longitude + '&units=m'

    // request({ url: url, json: true}, (error, response) => {
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services')
        } else if (body.error) {
            callback('Unable to find coordinates')
        } else {
            // callback(undefined, {
            //     location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
            //     description: body.current.weather_descriptions,
            //     temperature: body.current.temperature,
            //     precipitation: body.current.precip
            // })
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike + '. There is a ' + (body.current.precip*100) + '% chance of rain and the humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast