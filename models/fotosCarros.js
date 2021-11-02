const sequelize = require('./db')
const DataTypes = require('sequelize')

const fotosCarros = sequelize.define('fotosCarros', {
    foto1 : DataTypes.STRING(),
    foto2 : DataTypes.STRING(),
    foto3 : DataTypes.STRING(),
    foto4 : DataTypes.STRING(),
    foto5 : DataTypes.STRING()
})

module.exports = fotosCarros