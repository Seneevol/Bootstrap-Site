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

const bcrypt = require("bcrypt")

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
                if (results[0].isBan === 0) {
                    if (results[0].isAdmin === 1) {
                        req.session.isAdmin = true
                    }
                    req.session.user = results[0]
                    res.redirect('/home')
                    console.log('Oui');
                    return;
                }
            } else {
                res.render('connect', {
                   notWorking
                })
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
exports.registerInfo = async (req, res) => {
    const {
        name,
        password,
        email
    } = req.body

    const hash = bcrypt.hashSync(password, 10);
    if (req.body.password !== req.body.confirmation) {
        console.log("NO GOOD BITCH");
        res.render("home", {
            flash: "T'ES CON WOLA T'ES NUL"
        })
    } else {
        await db.query(`INSERT INTO users (name, email, password) VALUES ( '${name}', '${email}', '${hash}' );`, function (err) {
            if (err) res.redirect('back')
            console.log("COMPTE CREE BIEN JOUER !!!!!! REUSSIE !!!!!!");
            res.render("home", {
                flash: "GG BG !"
            })
        });
    }
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