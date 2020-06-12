const express = require('express')
const router = express.Router()
const checkUser = require('../core/check_user')
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.route('/').get((req, res) => {
    res.send('LOGIN GET')
}).post(async(req, res) => {
    const twiml = new MessagingResponse()

    let num = req.body.From
    let message = ''

    let temp = await checkUser(num).then(result => {
        return result
    }).catch(err => {
        console.error(err)
        return false
    })

    if (temp) {
        message = 'Welcome back!\nYou\'re awesome\n\nCommands available\n*/save* _<note name>_ _<note content>_ - To save a note\n*/book* _<bookmark or link etc>_ - To save a bookmark\n*/vbook* - To view all the bookmarks\n*/vnote* _<note name>_ - To fetch the note using note name\n'
    } else {
        message = 'Uh! oh. You\'re not authorized to use\nContact my master to get authorized'
    }

    twiml.message(message)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
})

module.exports = router