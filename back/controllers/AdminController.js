/*
 * Controller: Admin
 * *************** */

const dbUser = require('../../public/js/db.json').user
const fs = require("fs");

// Export Admin page
exports.adminPage = (req, res) => {
    console.log('Admin');
    res.render('admin', {
        dbUser
    })
}

// Edition sur la page Admin
exports.editAdminPage = (req, res) => {
    console.log("On édite:", req.params.id, req.body);
    let index = 0
    const userEdit = {
        id: Number(req.params.id),
        prénom: req.body.prénom,
        nom: req.body.nom,
        mail: req.body.mail
    }

    dbUser.forEach(user => {
        if (user.id === Number(req.params.id)) {
            console.log('indexof', dbUser.indexOf(user));
            index = dbUser.indexOf(user)
        }
    })

    dbUser.splice(index, index -1, userEdit)
    dbUser.slice(dbUser.splice(index + 1, 1))

    let data = JSON.stringify({ user: dbUser }, null, 2)

    fs.writeFile("./public/js/db.json", data, (err) => {
        if (err) console.log(err);
        console.log("J'ai crée le JSON");
    })

    res.render('admin', {
        dbUser
    });
};

// Mail answer
exports.answerMail = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
    res.render('admin')
}


// To delete things on Admin Page
exports.deleteAdminPage = (req, res) => {
    console.log('Je delete le truc:', req.params.id);
    res.render('admin')
}