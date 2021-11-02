const carros = require('../models/carros')
const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports = (req, res) => {

    let ano = ''
    let preco = ''
    let km = ''
    let localizacao = ''
    let and = ''
    
    if (req.body.localizacao == '' && (req.body.checkAno == '1' ||  req.body.checkPreco == '1' || req.body.checkKm == '1')) {
        localizacao = "localizacao LIKE '%' AND"

    } else if (req.body.localizacao != '' && (req.body.checkAno == '1' ||  req.body.checkPreco == '1' || req.body.checkKm == '1')) {
        localizacao = `localizacao LIKE '${req.body.localizacao}%' AND`

    }   else if (req.body.localizacao != '') {
        localizacao = `localizacao LIKE '${req.body.localizacao}%'`
        
    } else if (req.body.localizacao == '') {
        localizacao = "localizacao LIKE '%' "
    }

    if (req.body.checkAno == '1' && req.body.checkPreco == '1' && req.body.checkKm == '1') {
        and = 'AND'
        ano = `(anofabricacao BETWEEN '${req.body.anode}' AND '${req.body.anoate}') ${and}`
        preco = `(preco BETWEEN ${req.body.precode} AND ${req.body.precoate}) ${and}`
        km = `(quilometragem BETWEEN ${req.body.kmde} AND ${req.body.kmate})`

    } else if (req.body.checkAno == '1' && req.body.checkPreco == '1') {
        and   = 'AND'
        ano   = `(anofabricacao BETWEEN '${req.body.anode}' AND '${req.body.anoate}') ${and}`
        preco = `(preco BETWEEN ${req.body.precode} AND ${req.body.precoate})`

    } else if (req.body.checkAno == '1' && req.body.checkKm == '1') {
        and = 'AND'
        ano = `(anofabricacao BETWEEN '${req.body.anode}' AND '${req.body.anoate}') ${and}`
        km = `(quilometragem BETWEEN ${req.body.kmde} AND ${req.body.kmate})`

    } else if (req.body.checkPreco == '1' && req.body.checkKm == '1') {
        and = 'AND'
        preco = `(preco BETWEEN ${req.body.precode} AND ${req.body.precoate}) ${and}`
        km = `(quilometragem BETWEEN ${req.body.kmde} AND ${req.body.kmate})`

    } else if (req.body.checkAno == '1') {
        and = ''
        ano = `(anofabricacao BETWEEN '${req.body.anode}' AND '${req.body.anoate}') ${and}`

    } else if (req.body.checkPreco == '1') {
        and = ''
        preco = `(preco BETWEEN ${req.body.precode} AND ${req.body.precoate}) ${and}`
        
    } else if (req.body.checkKm == '1') {
        km = `(quilometragem BETWEEN  ${req.body.kmde} AND ${req.body.kmate})`
    }

    carros.findAll({
        where: {
           [Op.all]: sequelize.literal(`${localizacao} ${ano} ${preco} ${km}`)
        }
   
    }).then((carro) => {
        return res.render('catalogoBuscar', {carros : carro}, console.log('-- correct read'))
    }).catch((err) => {
        console.log('-- incorret read. ' + err
    )})
}