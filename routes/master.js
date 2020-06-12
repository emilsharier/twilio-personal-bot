const { propfind } = require('./vnote')

module.exports = (app) => {
    app.use('/', require('./root'))
    app.use('/login', require('./login'))
    app.use('/save', require('./save'))
    app.use('/vnote', require('./vnote'))
    app.use('/book', require('./book'))
    app.use('/vbook', require('./vbook'))
}