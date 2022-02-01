/*
 * Controller: Admin
 * *************** */

const {
    link
} = require("fs");

exports.getPageAdmin = async (req, res) => {
    console.log("Admin");
    res.render('admin', {
        dbUser:  await db.query('SELECT * FROM users'),
        dbArticle: await db.query('SELECT * FROM articles'),
        message: "J'ai pris les informations avec succès"
    }) 
}

exports.addArticle = async (req, res) => {
    const {
        name,
        content,
        link
    } = req.body
    console.log(req.body, req.file.filename);

    let sql = `INSERT INTO articles (name, image, content, link, author_id) VALUES ('${name}', '${req.file.filename}', '${content}', '${link}', ${req.session.user.id});`

    await db.query(sql, function (err) {
        if (err) throw err
        console.log('OUAIS OUAIS OUAIS ON A CREE LAREUTICLEUH');
        res.redirect('blog')
    })
}

// Edition sur la page Admin
exports.editAdminPage = (req, res) => {
    console.log("On édite:", req.params.id, req.body);
    res.render('admin');
};

// Mail answer
exports.listMail = (req, res) => {
    console.log('On regarde tes messages ici', req.body, req.files);
    res.render('admin')
}

// To delete things on Admin Page
exports.deleteUser = async (req, res) => {
    console.log('Je delete le truc:', req.params.id);
    await db.query(`DELETE FROM users WHERE id = ${ req.params.id }`)
    res.redirect('/admin')
}

exports.deleteArticle = async (req, res) => {
    console.log('Je delete le truc:', req.params.id);
    await db.query(`DELETE FROM articles WHERE id = ${ req.params.id }`)
    res.redirect('/admin')
}