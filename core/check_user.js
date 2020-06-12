require('dotenv').config()

const { sequelize } = require('../core/connection')

const checkUser = async(phone) => {
    let num = phone.replace('whatsapp:+91', '')
    console.log(num)

    let res = await sequelize.query({
            query: 'select * from users where phone = ?',
            values: [num]
        }).then(result => {
            // console.log(result.rows)
            console.log(`Result : ${result}`)
            return result[1].rowCount
        }).catch(err => {
            console.error(err)
            throw err
        })
        // sequelize.close()
    console.log(`res : ${res}`)
    if (res > 0)
        return true
    else
        return false
}

module.exports = checkUser