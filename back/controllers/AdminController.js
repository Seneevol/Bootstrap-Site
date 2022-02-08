/*
 * Controller: Admin
 * *************** */

const {
    link
} = require("fs");

exports.getPageAdmin = async (req, res) => {
    console.log("Admin");
    res.render('admin', {
        dbUser: await db.query('SELECT * FROM users'),
        dbArticle: await db.query('SELECT * FROM articles'),
    })
}

exports.addArticle = async (req, res) => {
    const {
        name,
        content,
        link
    } = req.body
    console.log(req.body, req.file.filename);

    let sql = `INSERT INTO articles (name, image, content, link, author_id) VALUES ("${name}", "${req.file.filename}", "${content}", "${link}", ${req.session.user.id});`

    await db.query(sql, function (err) {
        if (err) throw err
        console.log('OUAIS OUAIS OUAIS ON A CREE LAREUTICLEUH');
        res.redirect('blog')
    })
}

// Edition sur la page Admin
exports.editArticle = async (req, res) => {
    console.log("On édite:", req.params.id, req.body)

    var name = req.body.name
    var image = req.file
    var content = req.body.content
    var link = req.body.link
    var id = req.params.id

    if (name) {
        await db.query(`UPDATE articles SET name = '${name}' WHERE id = ${id}`)
    }
    if (image) {
        await db.query(`UPDATE articles SET image = '${req.file.filename}' WHERE id = ${id}`)
    }
    if (content) {
        await db.query(`UPDATE articles SET content = '${content}' WHERE id = ${id}`)
    }
    if (link) {
        await db.query(`UPDATE articles SET link = '${link}' WHERE id = ${id}`)
    }
    res.redirect('/admin')
}

exports.banUser = async (req, res) => {
    console.log("LA TU VOIS ON BAN:", req.params.id);
    await db.query(`UPDATE users SET isBan = 1 WHERE id = ${req.params.id}`)
    res.redirect('/admin')
}

exports.unbanUser = async (req, res) => {
    console.log("TOI TES GENTIL JE TE DEBAN:", req.params.id);
    await db.query(`UPDATE users SET isBan = 0 WHERE id = ${req.params.id}`)
    res.redirect('/admin')
}

// To delete things on Admin Page
exports.deleteUser = async (req, res) => {
    console.log('Je delete le truc:', req.params.id);
    await db.query(`DELETE FROM users WHERE users.id = ${ req.params.id }`)
    res.redirect('/admin')
}

exports.deleteArticle = async (req, res) => {
    console.log('Je delete le truc:', req.params.id);
    await db.query(`DELETE FROM articles WHERE id = ${ req.params.id }`)
    res.redirect('/admin')
}