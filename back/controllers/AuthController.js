/*
 * Controller: Auth
 * *************** */

const {
    request,
    response
} = require("express");
const {
    connect
} = require("../router");

// Export connection page
exports.connectPage = (req, res) => {
    console.log('Connect');
    res.render('connect')
}

// To connect
exports.connection = (req, res) => {
    var username = req.body.name
    var password = req.body.password
    if (username && password) {
        db.query('SELECT * FROM users WHERE name = ?', [username], function (error, results, fields) {
            if (results.length > 0) {
                console.log('login user is ', results[0])
                // req.session.loggedin = true
                // req.session.username = username
                req.session.user = results[0]
                if (results[0].isAdmin === 1) {
                    req.session.isAdmin = true
                }
                if (results[0].isBan === 1) {
                    res.send("T'es banni mec, dégage.")
                }

                res.redirect('/home')
                console.log('Oui');
                return;
            } else {
                res.redirect('/home')
                console.log('Non');
                return;
            }
        })
    }
    console.log('Olala les données de compte la', req.body);
    // res.render('connect')
}

// Export register page
exports.registerPage = (req, res) => {
    console.log('Register');
    res.render('register')
}

// To register an account
exports.registerInfo = (req, res) => {
    let sql = `INSERT INTO users (name,email,password) values(?)`;
    let values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], function (err) {
        if (err) throw err;
        console.log('Voici les données qui ont été add:', req.body);
        res.status(200).send("Création réussie")
        res.render('register')
    })
}

// Export password page
exports.passwordPage = (req, res) => {
    console.log('Password');
    res.render('password')
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('nakad')
        console.log(req.session)
        res.redirect('/')
    })
}

// Losing password things
exports.restoreMail = (req, res) => {
    console.log('Magnifique mail:', req.body);
    res.render('password')
}