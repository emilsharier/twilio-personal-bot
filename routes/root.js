const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const getRoute = require('../core/get_route')
    // const client = require('twilio')(process.env.SID, process.env.TOKEN)
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.use(bodyParser.urlencoded({ extended: true }))

router.route('/').post((req, res) => {
    const twiml = new MessagingResponse()
    let message = ''
    message = req.body.Body
    let to = req.body.To
    let from = req.body.From

    let welcomeMessage = 'Hello there!\nWelcome to custom-bot\nLets get you started\n\nSend */login* to get started'

    console.log('To : ' + to)
    console.log('From : ' + from)
    console.log('Body : ' + message)

    let value = getRoute(message).trim()
    message = message.replace(value, '').trim()

    console.log(`Value : ${value}`)
    console.log(`Message : ${message}`)

    switch (value) {
        case '/login':
            console.log('Redirecting to login ... ')
            res.redirect(307, '/login')
            break;
        case '/save':
            res.redirect(307, '/save')
            break;
        case '/book':
            res.redirect(307, '/book')
            break;
        case '/vbook':
            res.redirect(307, '/vbook')
            break;
        case '/vnote':
            res.redirect(307, '/vnote')
            break;
        default:
            twiml.message('Hello there!\nWelcome to custom-bot\nLets get you started\n\nSend */login* to get started')
            console.log(`${req.body.Body}`)
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
            break;
    }

}).get((req, res) => {
    res.send('Root GET')
})

module.exports = router