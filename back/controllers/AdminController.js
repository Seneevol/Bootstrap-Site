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
    if (req.body.name === "" && !req.file && req.body.content === "" && req.body.link === "") {
        sql = `SELECT name, image, content, link FROM articles WHERE id = ?`
        values = [req.params.id]
    } else if (req.body.name === "" && req.file && req.body.content === "" && req.body.link === "") {
        sql = `UPDATE articles SET image= ? WHERE id = ?`
        values = [
            req.file.filename,
            req.params.id
        ]
    } else if (req.body.name === "" && !req.file && req.body.content && req.body.link === "") {
        sql = `UPDATE articles SET content= ? WHERE id = ?`
        values = [
            req.body.content,
            req.params.id
        ]
    } else if (req.body.name === "" && !req.file && req.body.content === "" && req.body.link) {
        sql = `UPDATE articles SET link= ? WHERE id = ?`
        values = [
            req.body.link,
            req.params.id
        ]
    } else if (req.body.name && !req.file && req.body.content && req.body.link === "") {
        sql = `UPDATE articles SET name= ?, content= ? WHERE id = ?`
        values = [
            req.body.name,
            req.body.content,
            req.params.id
        ]
    } else if (req.body.name === "" && req.file && req.body.content && req.body.link === "") {
        sql = `UPDATE articles SET image= ?, content= ? WHERE id = ?`
        values = [
            req.file.filename,
            req.body.content,
            req.params.id
        ]
    } else if (req.body.name && req.file && req.body.content && req.body.link === "") {
        sql = `UPDATE articles SET name= ?, image= ?, content= ? WHERE id = ?`
        values = [
            req.body.name,
            req.file.filename,
            req.body.content,
            req.params.id
        ]
    } else if (req.body.name && req.file && req.body.content === "" && req.body.link) {
        sql = `UPDATE articles SET name= ?, image= ?, link= ? WHERE id = ?`
        values = [
            req.body.name,
            req.file.filename,
            req.body.link,
            req.params.id
        ]
    } else if (req.body.name && !req.file && req.body.content && req.body.link) {
        sql = `UPDATE articles SET name= ?, content= ?, link= ? WHERE id = ?`
        values = [
            req.body.name,
            req.body.content,
            req.body.link,
            req.params.id
        ]
    } else if (req.body.name && !req.file && req.body.content === "" && req.body.link) {
        sql = `UPDATE articles SET name= ?, link= ? WHERE id = ?`
        values = [
            req.body.name,
            req.body.link,
            req.params.id
        ]
    } else if (req.body.name === "" && req.file && req.body.content === "" && req.body.link) {
        sql = `UPDATE articles SET image= ?, link= ? WHERE id = ?`
        values = [
            req.file.filename,
            req.body.link,
            req.params.id
        ]
    } else if (req.body.name && !req.file && req.body.content && req.body.link === "") {
        sql = `UPDATE articles SET name= ?, content= ? WHERE id = ?`
        values = [
            req.body.name,
            req.body.content,
            req.params.id
        ]
    } else if (req.body.name && !req.file && req.body.content === "" && req.body.link === "") {
        sql = `UPDATE articles SET name= ? WHERE id = ?`
        values = [
            req.body.name,
            req.params.id
        ]
    } else {
        var sql = `UPDATE articles SET name= ?, image= ?, content= ?, link= ? WHERE id = ?`
        var values = [
            req.body.name,
            req.file.filename,
            req.body.content,
            req.body.link
        ]
    }

    await db.query(sql, values, function (err, edit) {
        if (err) throw err 
        res.redirect('/admin')
    })
};

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