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
    let { name, email, message } = req.body
    await db.query(`INSERT INTO messages SET authormessage= :name, email= :email, message= :message`, {name, email, message})
    res.redirect('/contact')
}
