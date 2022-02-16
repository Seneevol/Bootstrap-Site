/*
 * Controller: Contact
 * ******************* */ 

// Export of contact page
exports.contactPage = (req, res) => {
    console.log('Contact');
    res.render('contact')
}

// Send the contact request
exports.createMessage = async (req, res) => {
    console.log('On regarde tes messages mais sur la page contact!', req.body)
    var { name, email, message } = req.body
    await db.query(`INSERT INTO messages (authormessage, email, message) VALUES ( '${name}', '${email}', '${message}' );`)
    res.redirect('/contact')
}
