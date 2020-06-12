const { sequelize } = require('./connection')

const insertData = async(num, content) => {

    let note = content.slice(0, content.indexOf(' '))

    let message = content.replace(note, '')

    let res = await sequelize.query({
        query: 'insert into content (phone, note, message) values(?, ?, ?) on conflict do nothing',
        values: [num, note, message]
    }).then(result => {
        return true
    }).catch(err => {
        console.error(err)
        throw err
    })
    return res
}

module.exports = insertData