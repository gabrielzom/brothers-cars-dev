const sequelize = require('./db')
const DataTypes = require('sequelize')

const opcionaisCarros = sequelize.define('opcionaisCarros', {
    opcional : DataTypes.INTEGER,
    carro : DataTypes.INTEGER
})

module.exports = opcionaisCarros