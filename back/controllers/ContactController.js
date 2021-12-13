/*
 * Controller: Contact
 * ******************* */ 

exports.contactpage = (req, res) => {
    console.log('Contact');
    res.render('contact')
}

exports.createMessage = (req, res) => {
    console.log('On regarde tes messages ici', req.body);
}