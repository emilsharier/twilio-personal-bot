const express = require('express')
const checkUser = require('../core/check_user')
const insertData = require('../core/insert_data')
const router = express.Router()

const MessagingResponse = require('twilio').twiml.MessagingResponse

router.post('/', async(req, res) => {
    const twiml = new MessagingResponse()

    let to = req.body.To
    let from = req.body.From
    let body = req.body.Body

    let result = await checkUser(from)

    let num = from.replace('whatsapp:+91', '')

    if (result) {
        await insertData(num, body.replace('/save', '').trim()).then(t => {
            twiml.message('Note saved!')
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        }).catch(err => {
            console.error(err)
            throw err
        })
    } else {
        twiml.message('Uh, oh\n You\'re not authorized to do this action\nContact the developer')
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    }

})

module.exports = router