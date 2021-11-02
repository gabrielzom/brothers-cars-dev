const carros = require('../models/carros')
const sequelize = require('sequelize')

module.exports =  (req, res) => {
    carros.count()
        .then(carro => {
            return res.render('index', {
                carros : carro
            })
        })
        .catch(err => console.log('-- incorrect count. ' + err))
}
