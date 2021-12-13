/*
 * Controller: Home
 * *************** */ 

exports.homepage = (req, res) => {
    console.log('Homepage');
    const coucou = true
    console.log('Coucou est: ' + coucou);
    res.render('home', {
        coucou
     })
}