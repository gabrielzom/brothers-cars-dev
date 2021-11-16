const usuario = require('../models/usuarios')
const sequelize = require('../models/db')

module.exports = (req, res) => {
    usuario.findAll({where: {email: req.body.email}})
    .then((usuario) => {
        if(usuario[0] == undefined){
            console.log('Não existe esse email nos registros')
            res.redirect('/login')
            return
        }
        sequelize.query(`select cast(aes_decrypt(senha, ${process.env.KEY_AES_ENCRYPT})  as char) as 'senha' from usuarios  where email='${req.body.email}'`)
        .then((user)=> {
            console.log(user[0])
            if((user[0][0].senha == req.body.password)){
                sequelize.query(`select id from usuarios where email='${req.body.email}'`)
                .then((id) => {
                    const userId = id[0][0].id
                    console.log(userId)
                    localStorage.setItem('id', userId)
                }).catch((err) => console.log(err))
                res.redirect('/personalInfo')
            }else{
                res.redirect('/login')
                const erro = 'Email ou senha invalidos'
                console.log(erro)
            }
        })
        .catch(() => console.log('Erro')) 
    })
    .catch(() => console.log('Erro...'))
}