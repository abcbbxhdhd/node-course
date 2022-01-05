const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

geocode('Kharkiv', (error, {latitude, longtitude, location} = {}) => {
    if (error) {
        return console.log(error)
    } 
    
    forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log(location)
        console.log(forecastData)
    })
})

