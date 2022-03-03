/*
 * Controller: Home
 * *************** */
const {
    DEC8_BIN
} = require("mysql/lib/protocol/constants/charsets");
const bcrypt = require("bcrypt")
const path = require('path')

// Fichiers Utils
const { deleteOneFile } = require('../utils/deleteOneFile')



// Export of the home page
exports.homePage = async (req, res) => {
    console.log('Homepage');
    // Variable coucou for the different header
    const coucou = true
    console.log('Coucou est: ' + coucou);
    // Render of the page + Variable coucou
    res.render('home', {
        dbArticle: await db.query(`SELECT * FROM articles WHERE isVerify = 1 ORDER BY date DESC LIMIT 3`),
        coucou
    })
}

// To send a message on the Home Page
exports.createMessage = async (req, res) => {
    console.log('On regarde tes messages ici', req.body)
    let { name, email, message } = req.body
    await db.query(`INSERT INTO messages SET authormessage= :name, email= :email, message= :message`, {name, email, message})
    res.redirect('/home')
}

// Export de l'édite du profil
exports.editProfile = async (req, res) => {
    console.log("IDIDIDIDIDIDIDID", req.session.user.id)

    let getSql = `SELECT * FROM users WHERE id = ?`
    const hash = bcrypt.hashSync(req.body.password, 10)

    let name = req.body.name
    let avatar = req.file
    let password = req.body.password
    let oldPassword = req.body.oldPassword
    let id = req.session.user.id
    
    const user = await db.query(`SELECT * FROM users WHERE id = ${id}`)

    bcrypt.compare(oldPassword, req.session.user.password, async (err, same) => {
        if (!same) {
            console.log(req.session.user);
            res.redirect('back')
        } else if (same) {
            if (name) {
                await db.query(`UPDATE users SET username= :name WHERE id = ${id}`, {name})
            }
            if (avatar) {
                if (user[0].avatar != "default.png") {
                    const dir = path.join('./public/upload/users')
                    deleteOneFile(dir, user[0].avatar)
                }
                await db.query(`UPDATE users SET avatar= '${req.file.filename}' WHERE id = ${id}`)
            }
            if (password) {
                await db.query(`UPDATE users SET password= :hash WHERE id = ${id}`, {hash})
            }

            getSql = `SELECT * FROM users WHERE id = ${req.session.user.id}`
            await db.query(getSql, function (err, results) {
                if (err) throw err
                req.session.user = results[0]
                res.redirect('back')
            })
        }
    })
}

exports.MentionsPage = async (req, res) => {
    res.render('mentions')
}

// const hash = bcrypt.hashSync("1234", 10);

// sql = `UPDATE users SET password="${hash}" WHERE id = "24"`

// db.query(sql, function (err, edit) {
//     if (err) throw err
//     console.log('edit nakad')
// })