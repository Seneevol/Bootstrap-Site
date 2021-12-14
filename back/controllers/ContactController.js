/*
 * Controller: Contact
 * ******************* */ 

// Export of contact page
exports.contactPage = (req, res) => {
    console.log('Contact');
    res.render('contact')
}

// Send the contact request
exports.createMessage = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
    res.render('contact')
}