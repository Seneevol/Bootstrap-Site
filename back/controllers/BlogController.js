/*
 * Controller: Blog
 * *************** */

// Export of Blog page
exports.blogPage = async (req, res) => {
    console.log('Blog');
    res.render('blog', {
        dbArticle: await db.query(`SELECT * FROM articles`)
    })
}