/*
 * Controller: Blog
 * *************** */
const {
    log
} = require("console");
const {
    lchown
} = require("fs");

// Export of Blog page
exports.blogPage = async (req, res) => {
    console.log('Blog');
    res.render('blog', {
        dbArticle: await db.query(`SELECT * FROM articles WHERE isVerify = 1`)
    })
}

// Export of ID Page
exports.idPage = async (req, res) => {
    console.log('ID PAGE', req.params.id);
    let dbComment = await db.query(`
        SELECT comments.*, users.username, users.avatar 
        FROM comments
        INNER JOIN articles 
        ON comments.article_id = articles.id 
        INNER JOIN users
        ON comments.author_id = users.id
        WHERE articles.id = "${req.params.id}" && users.isBan = 0
        ORDER BY comments.id DESC
        `)
    let construct = []
    dbComment.map(async (el, index) => {
        const child = await db.query(`
        SELECT comments.*, users.username, users.avatar
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
         WHERE id = "${req.params.id}" 
         LIMIT 1
         `),
        dbUser: await db.query(`
        SELECT users.username 
        FROM users 
        INNER JOIN articles 
        ON users.id = articles.author_id 
        WHERE articles.id = "${req.params.id}"
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

    const { comment } = req.body;
    await db.query(`INSERT INTO comments SET content= :comment, author_id= '${req.session.user.id}', article_id= '${req.params.id}';`, {comment})
    res.redirect('back')
}

exports.replyComment = async (req, res) => {
    console.log(req.params.id);
    const { comment } = req.body;
    let id = await db.query(`SELECT id, article_id FROM comments WHERE id = "${req.params.id}"`)
    console.log(id)
    await db.query(`INSERT INTO comments SET content= :comment, author_id= "${req.session.user.id}", article_id= "${id[0].article_id}", parent_id= "${id[0].id}"`, {comment})
    res.redirect('back')
}