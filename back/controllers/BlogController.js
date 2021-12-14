/*
 * Controller: Blog
 * *************** */ 

// Export of Blog page
exports.blogPage = (req, res) => {
    console.log('Blog');
    res.render('blog')
}