/*
 * Controller: Admin
 * *************** */

// Export Admin page
exports.adminPage = (req, res) => {
    // Variable de récupération de tous les users
    let user = `SELECT * FROM users`;
    db.query(user, (error, data, fields) => {
        if (error) throw error;
        console.log('Admin');
        res.render('admin', {
            status: 200,
            dbUser: data,
            message: "J'ai pris les informations avec succès"
        })
    })
}

// Edition sur la page Admin
exports.editAdminPage = (req, res) => {
    console.log("On édite:", req.params.id, req.body);
    res.render('admin');
};

// Mail answer
exports.answerMail = (req, res) => {
    console.log('On regarde tes messages ici', req.body, req.files);
    res.render('admin')
}


// To delete things on Admin Page
exports.deleteAdminPage = (req, res) => {
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
            res.render('admin', {
                status: 200,
                dbAdmin: data,
                message: "Delete user successfully"
            })
        })
    })
}