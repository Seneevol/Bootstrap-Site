/*
 * Router.js
 * ************** */

// Import de module
const express = require('express')
const router = express.Router()

// Import Controllers
const HomeController = require("./controllers/HomeController")
const IdController = require("./controllers/IdController")
const BlogController = require("./controllers/BlogController")
const AdminController = require("./controllers/AdminController")
const AuthController = require("./controllers/AuthController")
const ContactController = require("./controllers/ContactController")

// Routes

// Routes Home
router.route('/')
    .get(HomeController.homepage)

router.route('/home')
    .get(HomeController.homepage)

// /Routes Home


// Route ID page
router.route('/id')
    .get(IdController.idpage)


// Route Blog page
router.route('/blog')
    .get(BlogController.blogpage)


// Route Admin page
router.route('/admin')
    .get(AdminController.adminpage)


// Routes Authentification pages
router.route('/connect')
    .get(AuthController.connectpage)

router.route('/password')
    .get(AuthController.passwordpage)

router.route('/register')
    .get(AuthController.registerpage)
// /Routes Authentification pages


// Route Contact page
router.route('/contact')
    .get(ContactController.contactpage)

//  /Routes

// Exports de notre router
module.exports = router