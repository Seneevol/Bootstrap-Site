/*
 * Controller: Home
 * *************** */ 

exports.homepage = (req, res) => {
    console.log('Homepage');
    res.render('home')
}