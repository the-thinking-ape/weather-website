# Weather App

This app serves clients weather forecasts based on their input location.

Input location can take **any** form, from postcode, to misspelled cities, to streets, etc! 

The app checks for edge cases so it doesn't break easily.

## Motivation

This seemingly simple website was the first ever website I created.

This is my first foray into full-stack web development. 

With it I learned and put into practice:
* What Node.js is and how to use it to turn client side JS to fullstack use
* How to make a dynamic frontend wired up with a nodejs powered backend.
* How to deploy a webapp (w/ Heroku), best practices and standards
* How to have the frontend and backend communicate
* How HTTP request/responses work
* How callback chainging, arrow functions, etc. work (context/scopes)
* How to use NPM to manage dependencies and install them automatically w/ package.json
* Deepend my understanding of Asynchronous JS promises, .then() , async/wait
* Deepend my understanding of **GIT** and learned how to make secure code transfer w/ SSH Key-Value Pairs
* Deepend my understanding of Javascript runtime internals (callbacks, callstack, callbackqueue, event loop, node api)

## Technology Stack
1. Frontend (client side)
    * CSS
    * HTML
2. Backend (server side)
    * HBS (dynamic page templating)  
    * Javascript 
    * Node.js (framework)
    * Express.js (framework)
    * JSON
3. Command Line
    * nodemon
    * package.JSON scripting
    * chalk 
    * Node Package Manager (NPM)
3. Production Enviroment
    * Heroku
4. Remote Repository
    * Github

## APIs
Our live accurate data is gathered from:

1. [Weatherstack](https://weatherstack.com/)
    * Humidity
    * Windspeed
    * Temperature 
    * Weather Icon
    * Precipitation Probability

2. [Mapbox](https://www.mapbox.com/)
    * Takes in text user input and returns latitude and loongitude geo-coordinates


> Author: The Thinking Ape
> Date: June 1, 2020