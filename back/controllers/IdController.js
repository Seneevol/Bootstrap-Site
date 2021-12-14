/*
 * Controller: Page ID
 * ******************* */ 

// Export of ID Page
exports.idPage = (req, res) => {
    console.log('Page ID');
    res.render('id')
}

// To delete comment of ID Page
exports.deleteComment = (req, res) => {
    console.log('Je delete les messages', req.params.id);
    res.render('id')
}

// Create comment on the ID Page
exports.createComment = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
    res.render('id')
}