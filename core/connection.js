require('dotenv').config()
const { Sequelize } = require('sequelize')

const dev = process.env.ENV

let connectionString = ''
let ssl = dev == 'development' ? false : { rejectUnauthorized: false }

if (dev != 'development') {
    connectionString = process.env.PROD_URL
} else {
    connectionString = process.env.DEV_URL
}

const sequelize = new Sequelize(connectionString)

module.exports = { connectionString, sequelize }