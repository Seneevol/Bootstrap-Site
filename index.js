require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 2223
const {
    engine
} = require('express-handlebars')

app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.use(express.static('public'))

const ROUTER = require('./back/router')
app.use('/', ROUTER)

app.listen(port, () => {
    console.log('Ca tourne sur le port: ' + port);
})