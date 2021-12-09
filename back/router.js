const express = require('express')
const router = express.Router()

const control = require("./controllers/control")

router.route('/')
    .get(control.homepage)

router.route('/home')
    .get(control.homepage)

router.route('/id')
    .get(control.idpage)

router.route('/blog')
    .get(control.blogpage)

module.exports = router