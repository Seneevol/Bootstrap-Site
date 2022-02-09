/*
 * Controller: Page ID
 * ******************* */
const {
    log
} = require("console");
const {
    lchown
} = require("fs");



// Export of ID Page
exports.idPage = async (req, res) => {
    console.log('ID PAGE', req.params.name);
    var dbComment = await db.query(`
        SELECT comments.*, users.name, users.avatar 
        FROM comments
        INNER JOIN articles 
        ON comments.article_id = articles.id 
        INNER JOIN users
        ON comments.author_id = users.id
        WHERE articles.name = "${req.params.name}"
        ORDER BY comments.id DESC
        `)
    let construct = []
    dbComment.map(async (el, index) => {
        const child = await db.query(`
        SELECT comments.*, users.name, users.avatar
        FROM comments
        INNER JOIN users
        ON comments.author_id = users.id
        WHERE parent_id = '${el.id}'
        ORDER BY comments.id ASC
        `)
        el.childs = child
        construct.push(el)
    })
    res.render('id', {
        dbArticle: await db.query(`
        SELECT * 
        FROM articles
         WHERE name = "${req.params.name}" 
         LIMIT 1
         `),
        dbUser: await db.query(`
        SELECT users.name 
        FROM users 
        INNER JOIN articles 
        ON users.id = articles.author_id 
        WHERE articles.name = "${req.params.name}"
        `),
        construct
    })
}

// To delete comment of ID Page
exports.deleteComment = async (req, res) => {
    console.log('Je delete les messages', req.params.id);
    await db.query(`DELETE FROM comments WHERE id = ${req.params.id}`)
    res.redirect('back')
}

// Create comment on the ID Page
exports.createComment = async (req, res) => {
    console.log('On regarde tes messages ici', req.params)
    var id = await db.query(`SELECT id FROM articles WHERE name = "${req.params.name}"`)
    console.log(id);
    await db.query(`INSERT INTO comments (content, author_id, article_id) VALUES ("${req.body.comment}", "${req.session.user.id}", '${id[0].id}')`)
    res.redirect('back')
}

exports.replyComment = async (req, res) => {
    console.log(req.params.id);
    var id = await db.query(`SELECT id, article_id FROM comments WHERE id = "${req.params.id}"`)
    console.log(id)
    await db.query(`INSERT INTO comments (content, author_id, article_id, parent_id) VALUES ("${req.body.comment}", "${req.session.user.id}", "${id[0].article_id}", "${id[0].id}")`)
    res.redirect('back')
}