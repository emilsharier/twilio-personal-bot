const express = require('express')
const router = express.Router()
const viewNote = require('../core/view_note')

const checkUser = require('../core/check_user')
const MessagingResponse = require('twilio').twiml.MessagingResponse

router.post('/', async(req, res) => {
    const twiml = new MessagingResponse()

    let to = req.body.To
    let from = req.body.From
    let body = req.body.Body

    let message = ''

    let temp = await checkUser(from)

    let note = body.replace('/vnote', '').trim()

    console.log(`Note before : ${note}`)

    let num = from.replace('whatsapp:+91', '')

    if (temp) {
        await viewNote(num, note).then(result => {
            console.log(result)
            message = ''
            if (result[1].rowCount == 0)
                message = 'Hmm it\'s so empty here .. '
            else
                result[0].forEach(value => {
                    // console.log(`Value : ${value.message}`)
                    message += `_*${value.note}*_ : ${value.message}\n`
                })
        }).catch(err => {
            console.error(err)
            message = `Note with the tag ${note} doesn\'t exist`
        })
    } else {
        message = 'Uh, oh\n You\'re not authorized to do this action\nContact the developer'
    }
    console.log('Message : ' + message)
    twiml.message(message)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
})

module.exports = router