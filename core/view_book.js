const { sequelize } = require('./connection')

const viewBook = async(num) => {
    num = num.replace('whatsapp:+91', '').trim()

    let res = await sequelize.query({
        query: 'select * from bookmarks where phone = ?',
        values: [num]
    }).then(result => {
        return result
    }).catch(err => {
        console.error(err)
        throw err
    })
    return res
}

module.exports = viewBook