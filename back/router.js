/*
 * Router.js
 * ************** */

// Import de module
const express = require('express')
const router = express.Router()
const upload = require('./config/multer')

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
    .get(HomeController.homePage)
    .post(HomeController.createMessage)
    .put(HomeController.editProfile)

router.route('/home')
    .get(HomeController.homePage)
    .post(HomeController.createMessage)
    .put(HomeController.editProfile)

// /Routes Home


// Route ID page
router.route('/id')
    .get(IdController.idPage)
    .post(IdController.createComment)

// Route for IDs on ID page
router.route('/id/:id')
    .delete(IdController.deleteComment)


// Route Blog page
router.route('/blog')
    .get(BlogController.blogPage)


// Route Admin page
router.route('/admin')
    .get(AdminController.adminPage)
    .post(upload.array('filename', 6), AdminController.answerMail)


// Routes for ID on Admin page
router.route('/admin/:id')
    .put(AdminController.editAdminPage)
    .delete(AdminController.deleteAdminPage)


// Routes Authentification page
router.route('/connect')
    .get(AuthController.connectPage)
    .post(AuthController.connection);

router.route('/password')
    .get(AuthController.passwordPage)
    .post(AuthController.restoreMail);

router.route('/register')
    .get(AuthController.registerPage)
    .post(AuthController.registerInfo);
// /Routes Authentification pages


// Route Contact page
router.route('/contact')
    .get(ContactController.contactPage)
    .post(ContactController.createMessage);

//  /Routes

// Exports de notre router
module.exports = router