const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

geocode('Rivne', (error, data) => {
    if (error) {
        return console.log(error)
    } 
    
    forecast(data.latitude, data.longtitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log(data.location)
        console.log(forecastData)
    })
})

