
/* IMPORT MODULE */
const express = require('express'),
    router = express.Router()

/* CONTROLLER */
const articleController = require("./controllers-tu/articleController")

/* ROUTER */

// Article
router.route("/article")
    .get(articleController.get)
    .post(articleController.post)
    .delete(articleController.deleteAll)

// Article ID
router.route("/article/:id")
    .get(articleController.getID)
    .put(articleController.editOne)
    .delete(articleController.deleteOne)

module.exports = router