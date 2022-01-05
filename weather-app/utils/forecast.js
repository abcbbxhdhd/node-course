const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=59a5c43df2b0aba73ef1a13e48d4f781&query=' + latitude + ',' + longtitude

    request({url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + 
                    '. It is currently ' + 
                    response.body.current.temperature + ' degrees.' +
                    ' It feels like ' + response.body.current.feelslike +
                    ' degrees.')
        }
    })
}

module.exports = forecast