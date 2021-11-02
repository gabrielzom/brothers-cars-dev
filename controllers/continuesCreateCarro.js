const carros = require('../models/carros')
const { Op } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (req, res) => {

    let preco = req.body.preco
    let quilometragem = req.body.quilometragem
    let quilometragemArray
    let precoArray
    
    function isNumber(num) {
        return !isNaN(num)
    }
    
    quilometragemArray = (quilometragem.split('')).filter(isNumber);
    precoArray = (preco.split('')).filter(isNumber);
    preco = ''
    quilometragem = ''
    
    for (let i=0; i<precoArray.length; i++) {
        preco += precoArray[i]
    }
    preco = Number(preco).toFixed(2) / 100
    
    for (let i=0; i<quilometragemArray.length; i++) {
        quilometragem += quilometragemArray[i]
    }

    carros
        .update({
            quilometragem : quilometragem,
            preco : preco,
            descricao : (req.body.descricao).toUpperCase(),
        }, 
        {
            where : {
                id : req.params.id
            }
        })
    .then(() => {
        res.render('incluircarro03', {
            id : req.params.id
        })
        console.log('-- correct update/create carro')
    })

    .catch((err) => {
        console.log('-- incorrect update/create carro: ' + err)
    })

}