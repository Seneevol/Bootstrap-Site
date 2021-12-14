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
    console.log('Bonjour:', req.body);
    res.render('register')
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