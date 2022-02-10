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

const bcrypt = require("bcrypt");
const {
    link
} = require("fs");

// Export connection page
exports.connectPage = (req, res) => {
    console.log('Connect');
    res.render('connect')
}

// Système de connexion
exports.connection = async (req, res) => {
    var username = req.body.name
    var password = req.body.password

    if (username === "" && password === "") {
        const nothing = true
        return res.render('connect', {
            nothing
        })
    }

    if (username && password) {
        await db.query('SELECT * FROM users WHERE name = ?', [username], function (error, results, fields) {

            if (!results[0]) {
                const noAccount = true
                res.render('connect', {
                    noAccount
                })
            }
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (error, same) => {
                    if (!same) {
                        const notWorking = true
                        res.render('connect', {
                            notWorking
                        })
                    } else if (results[0].isBan === 0) {
                        if (results[0].isAdmin === 1) {
                            req.session.isAdmin = true
                        }
                        req.session.user = results[0]
                        res.redirect('/home')
                        console.log('Oui');
                        return;
                    } else {
                        const notWorking = true
                        res.render('connect', {
                            notWorking
                        })
                        console.log('Non');
                    }
                })
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
    // On fait des variables pour les différents élements qui vont être entré
    const {
        name,
        password,
        email
    } = req.body

    // Variable servant à cripter le mot de passe avec Bcrypt
    const hash = bcrypt.hashSync(password, 10)
    // Test du mot de passe et de la confirmation
    if (req.body.password !== req.body.confirmation) {
        console.log("NO GOOD BITCH");
        // Variable pour modifier le rendu de la page si mot de passe eronné
        const failPassword = true
        res.render("register", {
            failPassword
        })
    } else {
        // Requête SQL pour tester la duplication du nom et de l'email
        await db.query(`SELECT name, email FROM users`, async function (err, results) {
            console.log("DONNE LA LENGTH LAAAAAA", results.length);
            // Variable pour gérer la réponse de la boucle
            var noDuplicate = true
            for (let i = 0; i < results.length; i++) {
                if (req.body.name === results[i].name) {
                    const usedName = true
                    noDuplicate = false
                    res.render("register", {
                        usedName
                    })
                } else if (req.body.email === results[i].email) {
                    const usedEmail = true
                    noDuplicate = false
                    res.render("register", {
                        usedEmail
                    })
                }
            }
            if (noDuplicate === true) {
                await db.query(`INSERT INTO users (name, email, password) VALUES ( '${name}', '${email}', '${hash}' );`, function (err) {
                    console.log("COMPTE CREE BIEN JOUER !!!!!! REUSSIE !!!!!!");
                    const successRegistration = true
                    res.render("connect", {
                        successRegistration
                    })
                })
            }
        })
    }
}

// Export password page

exports.passwordReseter = async (req, res) => {
    const { password, confirmation } = req.body
    const hash = bcrypt.hashSync(password, 10)

    if (password !== confirmation) {
        res.redirect('back')
    } else {
        await db.query((`UPDATE users SET password = '${hash}' WHERE id = '${req.params.id}'`), function (err) {
            const changePassword = true
            var userID = req.params.id
            res.render('connect', {
                changePassword,
                userID
            })
        })
    }
}

exports.passwordPage = (req, res) => {
    console.log('Password')
    res.render('password')
}

exports.resetPassword = async (req, res) => {
    var userID, mailOptions, host, linkMail

    userName = await db.query(`SELECT name FROM users WHERE email = '${req.body.email}'`)
    userID = await db.query(`SELECT id FROM users WHERE email = '${req.body.email}'`)
    host = req.get('host')
    linkMail = "http://" + req.get('host') + "/resetPass/" + userID[0].id
    if (userName.length > 0) {
        var mailOptions = {
            from: req.body.email,
            to: 'nakadcontact@gmail.com',
            subject: `'Vous avez demandé à réinitialiser votre mot de passe, ' + ${userName}`,
            rand: userID,
            html: `
            <p>Une demande de réinitialisation de votre mot de passe à été faite, veuillez suivre ce lien si vous en êtes l'auteur: </p><br>
            <a href="${linkMail}">Cliquez ici pour aller changer votre mot de passe</a>`
        }

        transporter.sendMail(mailOptions, (err, info, next) => {
            if (err) res.status(404)
            else {
                console.log(info)
                const mailSend = true
                res.render('password', {
                    mailSend
                })
                next()
            }
        })
    } else {
        const dontExist = true
        res.render('password', {
            dontExist
        })
    }
}
exports.resetPasswordPage = async (req, res) => {
    var userID, host
    console.log(req.protocol + "://" + req.get('host'))
    console.log('Page resetPassword: ')
    // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
    if ((req.protocol + "://" + req.get('host')) == ("http://" + req.get('host'))) {
        console.log("Domain is matched. Information is from Authentic email")
        var userID = await db.query(`SELECT id FROM users WHERE id = '${req.params.id}'`)
        if (req.params.id == userID[0].id) {
            res.render('resetPassword')
        } else {
            console.log("Mauvaise requête")
            res.redirect('/home')
        }
    } else {
        console.log("Requête inexistante")
        res.redirect('/home')
    }
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('nakad')
        res.redirect('/')
    })
}