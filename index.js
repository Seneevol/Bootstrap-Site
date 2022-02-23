/*
 * Index.js 
 * Fichier d'entré de l'application (Main / Root)
 * ********************************************** */
require('dotenv').config()

// Importation des modules npm
const 
express = require('express'),
app = express(),
expressSession = require('express-session'),
nodemailer = require('nodemailer'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
methodOverride = require('method-override'),
port = process.env.PORT || 2222,
 { engine } = require('express-handlebars'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./public/js/swagger.json')

// Module permettant de storer le cookie de l'utilisateur
const MySQLStore = require("express-mysql-session")(expressSession);

// Express generator
// const expressOasGenerator = require('express-oas-generator');
// expressOasGenerator.init(app, {});

// Options pour la connexion à la base de données
const options = {
    host: process.env.DB_HOST,
    port: process.env.PORT_MYSQL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
// Connexion à la base de données MySQL
db = mysql.createConnection(options)

db.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };

const util = require("util");
db.query = util.promisify(db.query).bind(db);

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

// Connexion du store à la base de données
const sessionStore = new MySQLStore(options)


// Handlebars
const {
    formatDate,
    formatDateCom,
    ifCond,
    ifEquals
} = require('./back/helper')
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    helpers: {
        formatDate,
        formatDateCom,
        ifCond,
        ifEquals
    },
    extname: 'hbs',
    defaultLayout: 'main'
}))

// Appelle du module Express-session
app.use(
    expressSession({
        secret: "securite",
        name: "nakad",
        saveUninitialized: true,
        resave: false,
        store: sessionStore
    })
)

// Connexion à gmail avec Nodemailer
transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    auth: {
        user: process.env.USERGMAIL,
        pass: process.env.PASSGMAIL
    }
})


// Method-Override
app.use(methodOverride('_method'))

// Le Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('public'))

// Définition de variables globals pour les sessions
app.use('*', (req, res, next) => {
    res.locals.visitor = req.session.visitor
    res.locals.user = req.session.user
    res.locals.isAdmin = req.session.isAdmin
    console.log(req.session.cookie)
    next()
})



// Swagger-ui
// swaggerDocument = require("./config/swagger.json");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

const ROUTER_API = require('./back/router-tu')
app.use('/back/v1', ROUTER_API)

// Met toute les autres page non défini en 404
// app.use('*', function (req, res) {
//     res.status(404).render("error404", {
//         layout: 'err'
//     })
// })

// Démarrage
app.listen(port, () => {
    console.log('Ca tourne sur le port: ' + port);
})

module.exports = { app }