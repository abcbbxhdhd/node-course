const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anton Antoniuk'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anton Antoniuk'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anton Antoniuk'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }

   geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
    if (error) {
        return res.send({error})
    } 
    
    forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            location,
            forecast: forecastData,
            address: req.query.address
        })
    })
})

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        'name': 'Anton Antoniuk',
        errorMessage: 'Page not found!'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.')
})