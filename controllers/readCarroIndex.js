const carros = require('../models/carros')
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = (req, res) => {

    let montadora = ''
    let modelo = ''

    if (req.body.searchCarro == undefined) {
        montadora = '%'
        modelo = '%'

    } else {
        montadora = `${req.body.searchCarro}%`
        modelo = `${req.body.searchCarro}%`
    }

    carros.findAll({
        where: {
           [Op.all]: sequelize.literal(`modelo LIKE '${modelo}' OR montadora LIKE '${montadora}'`)
        }
    }).then((carro) => {
        return res.render('catalogo', {carros : carro}, console.log('-- correct read'))
    }).catch((err) => {console.log('-- incorret read. ' + err)})
}