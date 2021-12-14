/*
 * Controller: Home
 * *************** */ 

// Export of the home page
exports.homePage = (req, res) => {
    console.log('Homepage');
    // Variable coucou for the different header
    const coucou = true
    console.log('Coucou est: ' + coucou);
    // Render of the page + Variable coucou
    res.render('home', {
        coucou
     })
}

// To send a message on the Home Page
exports.createMessage = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
    res.render('home')
}

// Export Edit 
exports.editProfile = (req, res) => {
    console.log('On édite même :', req.params.id, req.body);
    res.redirect('back')
}