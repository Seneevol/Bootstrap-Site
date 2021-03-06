/*
 * Controller: Admin
 * *************** */

const {
    link
} = require("fs");
const path = require('path')

// Fichiers Utils
const {
    deleteOneFile
} = require('../utils/deleteOneFile')

exports.getPageAdmin = async (req, res) => {
    console.log("Admin");
    res.render('admin', {
        dbUser: await db.query(`SELECT * FROM users`),
        dbArticle: await db.query(`SELECT articles.*, users.username FROM articles INNER JOIN users ON articles.author_id = users.id`),
        dbComment: await db.query(`SELECT comments.*, users.username FROM comments INNER JOIN users ON comments.author_id = users.id`),
        dbMessage: await db.query(`SELECT * FROM messages`)
    })
}

exports.addArticle = async (req, res) => {
    const {
        name,
        content,
        link
    } = req.body
    let avatar = req.file.filename
    console.log(req.body, req.file.filename);

    let sql = `INSERT INTO articles SET articlename= :name, image= :avatar, content= :content, link= :link, author_id= ${req.session.user.id};`

    await db.query(sql, {name, avatar, content, link}, function (err) {
        if (err) throw err
        console.log(`OUAIS OUAIS OUAIS ON A CREE LAREUTICLEUH`);
        res.redirect('blog')
    })
}

// Edition sur la page Admin
exports.editArticle = async (req, res) => {
    console.log("On édite:", req.params.id, req.body)

    let name = req.body.name
    let image = req.file
    let content = req.body.content
    let link = req.body.link
    let id = req.params.id
    const article = await db.query(`SELECT * FROM articles WHERE id = ${id}`)

    if (name) {
        await db.query(`UPDATE articles SET articlename= :name WHERE id = ${id}`, {name})
    }
    if (image) {
        const dir = path.join(`./public/upload/articles`)
        deleteOneFile(dir, article[0].image)
        await db.query(`UPDATE articles SET image = '${req.file.filename}' WHERE id = ${id}`)
    }
    if (content) {
        await db.query(`UPDATE articles SET content= :content WHERE id = ${id}`, {content})
    }
    if (link) {
        await db.query(`UPDATE articles SET link= :link WHERE id = ${id}`, {link})
    }
    res.redirect('/admin')
}

exports.banUser = async (req, res) => {
    console.log("LA TU VOIS ON BAN:", req.params.id)
    await db.query(`UPDATE users SET isBan = 1 WHERE id = ${req.params.id}`)
    await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${req.params.id}%'`)
    res.redirect('/admin')
}

exports.unbanUser = async (req, res) => {
    console.log("TOI TES GENTIL JE TE DEBAN:", req.params.id)
    await db.query(`UPDATE users SET isBan = 0 WHERE id = ${req.params.id}`)
    res.redirect('/admin')
}

exports.verifyArticle = async (req, res) => {
    console.log("LA TU VOIS ON VERIFIE DES ARTICLES:", req.params.id)
    await db.query(`UPDATE articles SET isVerify = 1 WHERE id = ${req.params.id}`)
    res.redirect('/admin')
}

exports.banArticle = async (req, res) => {
    console.log("LUI ON LE BAN LARTICLE", req.params.id)
    await db.query(`UPDATE articles SET isVerify = 0 WHERE id = ${req.params.id}`)
    res.redirect('/admin')
}

// To delete things on Admin Page
exports.deleteUser = async (req, res) => {
    console.log(`Je delete le truc:`, req.params.id)
    const user = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
    await db.query(`DELETE FROM users WHERE users.id = ${ req.params.id }`)
    if (user[0].avatar != "default.png") {
        const dir = path.join(`./public/upload/users`)
        deleteOneFile(dir, user[0].avatar)
    }
    res.redirect('/admin')
}

exports.deleteArticle = async (req, res) => {
    console.log(`Je delete le truc:`, req.params.id)
    const article = await db.query(`SELECT * FROM articles WHERE id = ${req.params.id}`)
    await db.query(`DELETE FROM articles WHERE id = ${ req.params.id }`)
    const dir = path.join(`./public/upload/articles`)
    deleteOneFile(dir, article[0].image)
    res.redirect('/admin')
}

exports.deleteMessage = async (req, res) => {
    console.log(`Je delete le truc:`, req.params.id)
    await db.query(`DELETE FROM messages WHERE id = ${ req.params.id }`)
    res.redirect('/admin')
}

exports.replyMessage = async (req, res) => {

    messageData = await db.query(`SELECT * FROM messages WHERE id = ${req.params.id}`)
    console.log(req.body);

    let message = req.body.message

    const mailOptions = {
        from: `noreply@socialmusic.com`,
        to: messageData[0].email,
        subject: `Réponse à: ` + messageData[0].authormessage,
        html: `<h1>NE REPONDEZ PAS A CE MAIL!!!!</h1><br><h2>${message}</h2>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) res.status(404)
        else {
            console.log(info)
            console.log(`Le body quand on envoie laaaaaaa`, message);
            res.redirect('/admin')
        }
    })
    await db.query(`DELETE FROM messages WHERE id = ${ req.params.id }`)
}