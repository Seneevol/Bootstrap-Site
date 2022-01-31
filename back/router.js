/*
 * Router.js
 * ************** */

// Import de module
const
    express = require('express'),
    router = express.Router(),
    mdl = require('./middleware/middleware.js'),
    upload = require('./config/multerDefault'),
    uploadAvatar = require('./config/multerUser'),
    uploadArticle = require('./config/multerArticles');

// Import Controllers
const
    HomeController = require("./controllers/HomeController"),
    IdController = require("./controllers/IdController"),
    BlogController = require("./controllers/BlogController"),
    AdminController = require("./controllers/AdminController"),
    AuthController = require("./controllers/AuthController"),
    ContactController = require("./controllers/ContactController");


// if (req.session.loggedin) {
//     const login = true
// }
// Routes

// Routes Home
router.route('/')
    .get(HomeController.homePage)
    .post(HomeController.createMessage)
    .put(HomeController.editProfile)

router.route('/home')
    .get(HomeController.homePage)
    .post(HomeController.createMessage)
    .put(uploadAvatar.single('avatar', 1), HomeController.editProfile)

// /Routes Home

router.route('/article')
    .post(uploadArticle.single('image', 1), AdminController.addArticle)

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
    .get(mdl.isAdmin, AdminController.listUser)
    .get(AdminController.listMail)


// Routes for ID on Admin page
router.route('/admin/:id')
    .put(AdminController.editAdminPage)
    .delete(AdminController.deleteUser)


// Routes Authentification page
router.route('/connect')
    .get(AuthController.connectPage)
    .post(AuthController.connection);

router.route('/logout')
    .get(AuthController.logout)

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