exports.isAdmin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/')
    } else if (!req.session.user.isAdmin) {
        res.redirect('/')
    } else {
        next();
    }
}