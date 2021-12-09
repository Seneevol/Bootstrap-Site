exports.homepage = (req, res) => {
    console.log('Homepage');
    res.render('home')
}

exports.idpage = (req, res) => {
    console.log('Page ID');
    res.render('id')
}

exports.blogpage = (req, res) => {
    console.log('Blog');
    res.render('blog')
}