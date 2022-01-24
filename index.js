/*
 * Index.js 
 * Fichier d'entré de l'application (Main / Root)
 * ********************************************** */ 
require('dotenv').config()

// Importation des modules npm
const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const methodOverride = require('method-override')
const port = process.env.PORT || 2222
const { engine } = require('express-handlebars')

var MySQLStore = require("express-mysql-session")(session);

// Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

// MySQL
db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

var sessionStore = new MySQLStore(db)

// Express-session
/*app.use(session({
    secret: 'teamnakad',
    name: "nina",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  }))*/

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