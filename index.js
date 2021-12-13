/*
 * Index.js 
 * Fichier d'entré de l'application (Main / Root)
 * ********************************************** */ 
require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 2223
const { engine } = require('express-handlebars')

app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.use(methodOverride('_method'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

const ROUTER = require('./back/router')
app.use('/', ROUTER)

app.listen(port, () => {
    console.log('Ca tourne sur le port: ' + port);
})