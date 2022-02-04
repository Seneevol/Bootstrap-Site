/*
 * Controller: Home
 * *************** */
const {
    DEC8_BIN
} = require("mysql/lib/protocol/constants/charsets");
const bcrypt = require("bcrypt")



// Export of the home page
exports.homePage = async (req, res) => {
    console.log('Homepage');
    // Variable coucou for the different header
    const coucou = true
    console.log('Coucou est: ' + coucou);
    // Render of the page + Variable coucou
    res.render('home', {
        dbArticle: await db.query(`SELECT * FROM articles ORDER BY date DESC LIMIT 3`),
        coucou
    })
}

// To send a message on the Home Page
exports.createMessage = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
    res.render('home')
}

// Export de l'édite du profil
exports.editProfile = (req, res) => {
    console.log("IDIDIDIDIDIDIDID", req.session.user.id);

    var getSql = `SELECT * FROM users WHERE id = ?`
    const hash = bcrypt.hashSync(req.body.password, 10);
    
    // Gestion des différentes possibilités au niveau de l'édition du profile

    // Si pas de fichier mais un pseudo et un mot de passe
    if (!req.file && req.body.name && hash) {
        sql = `UPDATE users SET name = ?, password= ? WHERE id = ?`
        values = [req.body.name, hash, req.session.user.id]
    // Si pas de nom mais un fichier et un mot de passe
    } else if (req.body.name === "" && req.file && hash) {
        sql = `UPDATE users SET avatar = ?, password= ? WHERE id = ?`
        values = [req.file.filename, hash, req.session.user.id]
    // Si ni fichier, ni nom mais un mot de passe
    } else if (req.body.name === "" && !req.file && hash) {
        sql = `UPDATE users SET password= ? WHERE id = ?`
        values = [hash, req.session.user.id]
    // Si ni fichier, ni nom, ni mot de passe
    }else if (req.body.name === "" && !req.file && !hash){
        sql = `SELECT name, avatar, password FROM users WHERE id = ?`
        values = [req.session.user.id]
    // Sinon on fait la requête de base
    } else {
        var sql = `UPDATE users SET name= ?, avatar= ?, password= ? WHERE id = ?`
        var values = [
            req.body.name,
            req.file.filename,
            hash,
            req.session.user.id
        ]
    }

    db.query(sql, values, function (err, edit) {
        if (err) throw err
        getSql = `SELECT * FROM users WHERE id = ${req.session.user.id}`
        db.query(getSql, function (err, results) {
            if (err) throw err
            req.session.user = results[0]
            res.redirect('back')
        })
    })
}