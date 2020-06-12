const getRoute = (name) => {
    if (name.includes('/login'))
        return '/login'
    else if (name.includes('/save'))
        return '/save'
    else if (name.includes('/book'))
        return '/book'
    else if (name.includes('/vbook'))
        return '/vbook'
    else if (name.includes('/vnote'))
        return '/vnote'
    else return ''
}

module.exports = getRoute