/*
 * Controller: Auth
 * *************** */ 

// Export connection page
exports.connectpage = (req, res) => {
    console.log('Connect');
    res.render('connect')
}

// Export register page
exports.registerpage = (req, res) => {
    console.log('Register');
    res.render('register')
}

// Export password page
exports.passwordpage = (req, res) => {
    console.log('Password');
    res.render('password')
}