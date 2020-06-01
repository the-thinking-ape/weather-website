// TO run server and update w/ each save: nodemon src/app.js -e js,hbs,css

/* Core Node Modules */ 
const path = require('path')

/* NPM Modules */
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')

/* In-House Util Modules */
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/* Create Server */
const app = express()
const port = process.env.PORT || 3000 // this capture heroku's PORT dynamic enviroment variable value
// we added the logical or '|| 3000' so that if we run this locally it will not crash and will use 3000 port instead

/* Configure Server */
/* Define paths for express config */
const publicDirPath =  path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/* Setup handlebars engine and views location */
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs') 
app.set('views',viewsPath) 

/* Setup static directory to serve */
app.use(express.static(publicDirPath))

/* Run Server to listen for requests via a Port*/
app.listen(port, ()=>{ 
    console.log(chalk.blue.bold('Server is up on port ' + port))
})

/* Route Request Handlers (w/ .get()) */
app.get('',(req,res)=>{
    res.render('index', { 
        title: 'Weather',
        name: 'Thinking Ape'
    }) 
})

app.get('/about',(req,res)=>{
    res.render('about', { 
        title: 'About',
        name: 'Thinking Ape'
    }) 
})

app.get('/help',(req,res)=>{
    res.render('help', { 
        helpTxt: 'You need some help sir, you got somee major problems!!!',
        title: 'Help',
        name: 'Thinking Ape'
    }) 
})


/* Challenge: wire up /weather .get() */
//
// 1. Require geocode/forecast into app.js
// 2. Use coordinates to get weather forecast
// 3. Send back real forecast and location dynamically
// 4. Test '/weather' and '/weather?address=philadelphia'
//

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'No address provided.'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, location} = {}) => { // firstargument = default argument, if firstArg is undefined or not there use defaultArg, we can't destructure an undefined (if an error happens), so use the defaultArg pattern
        if(error){
            return res.send({error}) // send error response
        } 
        forecast(latitude, longitude, (error, forecastMessage) => {
            if(error){
                return res.send({error}) 
            }

            res.send({
                forecast: forecastMessage,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res)=>{ 
    res.render('404',{
        title: '404',
        name: 'Thinking Ape',
        errorTxt: 'Help article not found.'
    })
})

app.get('*',(req,res)=>{ 
    res.render('404',{
        title: '404',
        name: 'Thinking Ape',
        errorTxt: 'Page not found.'
    })
})

/* Query Strings */
// When we send JSON data, in the URL we get the string object
// Query strings are appended at the end of this URL after '?' question mark
// They help extract the desired info from said JSON object
// We start with Question mark, then 
// We provide Key/Value pairs to pass aditiona info to the server
// ex: ?key=value
// search query argument: ?search=searchTerm

// When making the backend we decide how many querystrings we want to support from 0
// You can add as many queries through the And '&' symbol
// ex: ?search=searchTerm&key=value&rating=5

// req.query object holds all requeststring info
// access values passed along w/ request
// express doesn't give option to force certain things to be provided

// client side javascript sends querystring to server, then server checks request and sends response to client

/* EXAMPLE below */

app.get('/products',(req,res)=>{ // querystring info livs inside request (Req)


    // ERROR: Cannot set headers after they are sent to the client
    // the above error means you try to respond to a request twice. HTTP request have a single request and response, you cant do it twice
    // you can respond twice. You can't send twice for one request.
    if(!req.query.search){ // when search query value isn't provided send error msg
        return res.send({ // to solve error use {else} or return the response to exit .get()
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.rating) //query is an object containing all querystring information from request (it was parsed by express)
    res.send({
        products:[]
    })
})