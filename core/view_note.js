const { connectionString, sequelize } = require('./connection')

const viewNote = async(num, note) => {

    console.log(`The note is ${note}`)

    let res = await sequelize.query({
        query: 'select * from content where phone = ? and note = ?',
        values: [num, note.trim()]
    }).then(result => {
        return result
    }).catch(err => {
        console.error(err)
        throw err
    })
    return res
}

module.exports = viewNote