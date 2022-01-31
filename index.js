/*
 * Index.js 
 * Fichier d'entré de l'application (Main / Root)
 * ********************************************** */
require('dotenv').config()

// Importation des modules npm
const express = require('express')
const app = express()
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const methodOverride = require('method-override')
const port = process.env.PORT || 2222
const {
    engine
} = require('express-handlebars')


const MySQLStore = require("express-mysql-session")(expressSession);

const options = {
    host: process.env.DB_HOST,
    port: process.env.PORT_MYSQL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
// MySQL
db = mysql.createConnection(options)

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

const sessionStore = new MySQLStore(options)

// Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

// Express-session
app.use(
    expressSession({
        secret: "securite",
        name: "nakad",
        saveUninitialized: true,
        resave: false,
        store: sessionStore
    })
);

// Method-Override
app.use(methodOverride('_method'))

// Le Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('public'))

app.use('*', (req, res, next) => {
    res.locals.user = req.session.user
    res.locals.isAdmin = req.session.isAdmin
    // console.log(req.session)
    next()
})

// Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

// Démarrage
app.listen(port, () => {
    console.log('Ca tourne sur le port: ' + port);
})