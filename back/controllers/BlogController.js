/*
 * Controller: Blog
 * *************** */ 

// Export of Blog page
exports.blogPage = (req, res) => {
    let article = `SELECT * FROM articles`
    db.query(article, (err, data) => {
        if (err) throw err
        console.log('Blog');
        res.render('blog', {
            dbArticle: data
        })
    })
}