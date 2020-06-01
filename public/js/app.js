/* use NPM module browserify to use 'require' and module.exports on client side js! */
// const playSounds = require('./playSound.js') 


console.log('Client side JS has loaded!')

// IMPORTANT: https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined
// Node.Js modules like 'require' don't work in client side JS

// select element from html document (DOM)
const weatherForm = document.querySelector('form') // this returns a javascript representation of element
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
document.querySelector("#weather-icon").src=""

/* Audio functionality */
const audio1 = document.getElementById("reload");
const audio2 = document.getElementById("shoot");

function reload() {
    audio1.play();

}
function shoot() {
    audio2.play();
}
/* End of Audio Func */


// on submit click
// event listeners listen to events (interactions w/ website)
weatherForm.addEventListener('submit',(e)=>{ //e stands for event

    e.preventDefault()
    // prevents default behaviour like browser refreshing givng us time to do what we want
    // .preventDefault tells the browser that our code will handle everything and it doesn't need to do what it normally does automatically

    const location = searchElement.value // value extracts input val of element, element value is set when submitting

  
    reload()   // play audio on-click
    document.querySelector("#weather-icon").src="" // empty image
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return messageOne.textContent = data.error
        }

        shoot() // play audio on-data arrival

        messageOne.textContent = data.location
        document.querySelector("#weather-icon").src= data.weatherIcon // add weather icon
        messageTwo.textContent = data.forecast
    })
})
})