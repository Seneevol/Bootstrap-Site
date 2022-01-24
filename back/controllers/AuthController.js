/*
 * Controller: Auth
 * *************** */

// Export connection page
exports.connectPage = (req, res) => {
    console.log('Connect');
    res.render('connect')
}

// To connect
exports.connection = (req, res) => {
    console.log('Olala les données de compte la', req.body);
    res.render('connect')
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

// Losing password things
exports.restoreMail = (req, res) => {
    console.log('Magnifique mail:', req.body);
    res.render('password')
}