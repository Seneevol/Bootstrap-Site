/*
 * Controller: Admin
 * *************** */

const {
    link
} = require("fs");

// Export liste des utilisateurs
exports.listUser = (req, res) => {
    // Variable de récupération de tous les users
    let user = `SELECT * FROM users`;
    db.query(user, (error, data, fields) => {
        if (error) throw error;
        console.log('Admin');
        res.render('admin', {
            dbUser: data,
            message: "J'ai pris les informations avec succès"
        })
    })
}

exports.listArticle = (req, res) => {
    let article = `SELECT * FROM articles`
    db.query(article, (err, data) => {
        if (err) throw err
        res.render('admin', {
            dbArticle: data
        })
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
exports.deleteUser = (req, res) => {
    console.log('Je delete le truc:', req.params.id);
    let sql = `DELETE FROM users WHERE id = ?`;
    let values = [
        req.params.id
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        let sql = `SELECT * FROM users`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.redirect('admin', {
                dbAdmin: data,
                message: "Delete user successfully"
            })
        })
    })
}