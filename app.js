const express = require('express')
const app = express()
const path = require('path')

const methodOverride = require('method-override')

const readCarroIndex = require('./controllers/readCarroIndex')
const countCarro = require('./controllers/countCarro')
const readCarroCatalogo = require('./controllers/readCarroCatalogo')
const createClienteAndEndereco = require('./controllers/createClienteAndEndereco')
const createCarro = require('./controllers/createCarro')
const continuesCreateCarro = require('./controllers/continuesCreateCarro')
const completeCreateCarro = require('./controllers/completeCreateCarro')
const userLogin = require('./controllers/userLogin')

const uploadCarro = require('./modules/uploadCarro')
const upload = require('./modules/upload')
const loadEstadosAndCidades = require('./modules/loadEstadosAndCidades')
const loadAnos = require('./modules/loadAnos')
const loadCores = require('./modules/loadCores')
const loadMontadoras = require('./modules/loadMontadoras')


require('dotenv').config()
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/incluircarro', (req, res) => {
    res.render('incluircarro01')
})
app.get('/incluircarro02', (req, res) => {
    res.render('incluircarro02')
})
app.get('/incluircarro03', (req, res) => {
    res.render('incluircarro03')
})

app.get('/json/estadosandcidades/', loadEstadosAndCidades)
app.get('/json/cores/', loadCores)
app.get('/json/anos/', loadAnos)
app.get('/json/montadoras/', loadMontadoras)

app.get('/', countCarro)
app.get('/login', (req, res) => res.render('login'))

app.get('/cadastro', (req, res) => {let message = ''; res.render('cadastro', {message : message})})
app.post('/cadastro', upload.array('doc', 2), createClienteAndEndereco)

app.get('/catalogo' , readCarroIndex)

app.get('/personalInfo', (req, res) => {
    res.render('personalInfo')
})

app.get('/alterPassword', (req, res) =>{
    res.render('alterPassword')
})

app.get('/myCars', (req, res) => {
    res.render('myCars')
})

app.post('/catalogo', readCarroIndex)
app.post('/catalogoBuscar', readCarroCatalogo)
app.post('/incluircarro', uploadCarro.array('fotoCarro', 3), createCarro)

app.post('/entrar', userLogin)


app.put('/:id', uploadCarro.array('fotoCarro', 3), continuesCreateCarro)
app.put('/finaliza/:id', completeCreateCarro)
app.get('/sucessoCarro', (req, res) => {res.render('sucessoCarro')})

app.listen(process.env.PORT || 9090, () => {
    console.log(`-- Server running in port: ${process.env.PORT}.  Default: 9090 `)
})