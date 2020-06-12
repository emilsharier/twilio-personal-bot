require('dotenv').config()

const app = require('express')()
require('./routes/master')(app)

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
    console.log(`Server up and running at ${process.env.PORT}`)
})