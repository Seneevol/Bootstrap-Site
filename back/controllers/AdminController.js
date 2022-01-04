/*
 * Controller: Admin
 * *************** */

// Export Admin page
exports.adminPage = (req, res) => {
    console.log('Admin');
    res.render('admin')
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
    res.render('admin')
}