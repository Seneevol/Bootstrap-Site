/*
 * Controller: Page ID
 * ******************* */ 

// Export of ID Page
exports.idPage = async (req, res) => {
    console.log('ID PAGE');
    res.render('id', {
        dbArticle: await db.query(`SELECT * FROM articles WHERE name = "${req.params.name}" LIMIT 1`),
        dbUser: await db.query(`SELECT users.name FROM users INNER JOIN articles ON users.id = articles.author_id WHERE articles.name = "${req.params.name}"`)
    })
}

// To delete comment of ID Page
exports.deleteComment = (req, res) => {
    console.log('Je delete les messages', req.params.id);
    res.render('id')
}

// Create comment on the ID Page
exports.createComment = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
    res.render('id')
}