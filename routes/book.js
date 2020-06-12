const express = require('express')
const router = express.Router()
const checkUser = require('../core/check_user')
const insertBook = require('../core/insert_book')
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.post('/', async(req, res) => {
    const twiml = new MessagingResponse()

    let num = req.body.From
    let message = ''
    let content = req.body.Body

    let temp = await checkUser(num).then(result => {
        return result
    }).catch(err => {
        console.error(err)
        return false
    })

    if (temp) {
        await insertBook(num, content).then(result => {
            message = 'Ay! Captain\nBookmark *saved*!'
        }).catch(err => {
            console.error(err)
            message = 'Hmm I encountered an error\nContact my master and please help me out'
        })
    } else {
        message = 'Uh! oh. You\'re not authorized to use\nContact my master to get authorized'
    }

    twiml.message(message)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
})

module.exports = router