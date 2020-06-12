const { connectionString } = require('./connection')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(connectionString)

const deleteData = async(name) => {

}

module.exports = deleteData