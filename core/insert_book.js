const { sequelize } = require('./connection')

const insertBook = async(num, content) => {
    content = content.replace('/book', '').trim()

    num = num.replace('whatsapp:+91', '').trim()

    let res = await sequelize.query({
        query: 'insert into bookmarks (phone, bookmark) values(?, ?)',
        values: [num, content]
    }).then(result => {
        return true
    }).catch(err => {
        console.error(err)
        throw err
    })
    return res
}

module.exports = insertBook