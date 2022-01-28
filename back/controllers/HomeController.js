/*
 * Controller: Home
 * *************** */
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

 

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
    console.log("IDIDIDIDIDIDIDID", req.session.user.id);
    const { name, pseudo } = req.body

    console.log("test", req.session);

    const sql = `UPDATE users SET name= ?, avatar= ? WHERE id = ?`
    const values = [
        req.body.name,
        req.file.filename,
        req.session.user.id
    ]

    db.query(sql, values, function (err, edit) {
        if (err) throw err
        req.session.user.name = req.body.name;
        req.session.user.avatar = req.file.filename;
        console.log("C'est mis à jour la");
        console.log('On édite même :', req.session.user.id, req.body);
        res.redirect('back')
    })
}