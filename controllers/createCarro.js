const carros = require('../models/carros')
const sequelize = require('sequelize')

module.exports = (req, res) => {
    carros.create({
        montadora : req.body.montadora,
        modelo : (req.body.modelo).toUpperCase(),
        portas : req.body.portas,
        placa : req.body.placa,
        anomodelo : req.body.anomodelo,
        anofabricacao : req.body.anofabricacao,
        cor : req.body.cor,
        blindado : req.body.blindado
    })
        .then((carro) => {
            res.render('incluircarro02',
                { id : carro.id }
            )
            console.log('-- correct create carro')
        })
        .catch((err) => console.log('-- incorrect create carro: ' + err))
}
