const express = require('express')
const router = express.Router()
const viewBook = require('../core/view_book')

const checkUser = require('../core/check_user')
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.post('/', async(req, res) => {
    const twiml = new MessagingResponse()

    let to = req.body.To
    let from = req.body.From
    let body = req.body.Body

    let temp = await checkUser(from)

    let message = ''

    if (temp) {
        await viewBook(from).then(result => {
            console.log(result)
            message = ''
            if (result[1].rowCount == 0)
                message = 'Hmm it\'s so empty here .. '
            else {
                twiml.message('The bookmarks are')
                result[0].forEach(value => {
                    twiml.message(`${value.bookmark}`)
                })
            }
        }).catch(err => {
            console.error(err)
            message = `Uh. oh! something went wrong`
            twiml.message(message)
        })
    } else {
        message = 'Uh, oh\n You\'re not authorized to do this action\nContact the developer'
        twiml.message(message)
    }
    console.log('Message : ' + message)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
})

module.exports = router