const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
// const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Pavan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pavan Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        helpText: 'This is some helpful text.',
        name:'Pavan Kumar Polepaka'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Address Key is Required'
        })
    }
    forecast(req.query.address, (error,forecastData) => {
        if(error) 
            return res.send({
                error : 'Couldn\'t find the given location'
            })
        return res.send({
            location:forecastData.location,
            forecast:forecastData.forecast,
            temperature:forecastData.temperature,
            feelslike:forecastData.feelslike,
            humidity:forecastData.humidity
        })
    })

    

    // res.send({
    //     forecast: 'It is normal',
    //     location: 'Hyderabad',
    //     address:req.query.address
    // })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404 Error',
        name:'PPK',
        errorMessage:'Help Article Not Found'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send( {
            error : 'Search Value is Required'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*' ,(req,res) => {
    res.render('404',{
        title : '404 Error',
        name : 'Polepaka',
        errorMessage : 'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})