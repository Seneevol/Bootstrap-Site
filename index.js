/*
 * Index.js 
 * Fichier d'entré de l'application (Main / Root)
 * ********************************************** */ 
require('dotenv').config()

// Importation des modules npm
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const methodOverride = require('method-override')
const port = process.env.PORT || 2223
const { engine } = require('express-handlebars')

// Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

// MySQL
db = mysql.createConnection({
    host: 'localhost',
    user: 'nakad',
    password: 'nakad976',
    database: 'testsite'
});

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

// Method-Override
app.use(methodOverride('_method'))

// Le Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

// Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

// Démarrage
app.listen(port, () => {
    console.log('Ca tourne sur le port: ' + port);
})