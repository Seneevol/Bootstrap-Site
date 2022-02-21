module.exports = {
    get: async (req, res) => {

        await db.query(`SELECT * FROM articles`, async (err, data, fields) => {
            if (err) throw err
            res.json({
                dbArticle: data
            })
        })
    },

    getID: async (req, res) => {

        await db.query(`SELECT * FROM articles WHERE id = ${req.params.id}`, async (err, data, fields) => {
            if (err) throw error
            res.json({
                dbArticle: data
            })
        })
    },

    post: async (req, res) => {

       const 
        { name, content } = req.body,
        image = req.file,
        imageName = req.file.filename

        await db.query(`INSERT INTO articles SET name= :name, image= :imageName, content= :content`, {name, imageName, content}, async (err, data, fields) => {
            if (err) throw err
            await db.query(`SELECT * FROM articles`, (err, data, fields) => {
                if (err) throw err
                res.json({
                    dbArticle: data
                })
            })
        })
    },

    editOne: async (req, res) => {

        const 
            { name, content } = req.body

        await db.query(`UPDATE articles SET articlename= :name, content= :content`, {name, content}, async (err, edit, fields) => {
            if (err) throw err
            await db.query(`SELECT * FROM articles`, (err, data, fields) => {
                if (err) throw err
                res.json({
                    dbArticle: data
                })
            })
        })
    },

    deleteOne: async (req, res) => {

        await db.query(`DELETE FROM articles WHERE id = ${req.params.id}`, async (err, data, fields) => {
            if (err) throw err
            await db.query(`SELECT * FROM articles`, (err, data, fields) => {
                if (err) throw err
                res.json({
                    dbArticle: data
                })
            })
        })
    },

    deleteAll: async (req, res) => {

        await db.query(`DELETE FROM articles`, async (err, data, fields) => {
            if (err) throw err
            await db.query(`SELECT * FROM articles`, (err, data, fields) => {
                if (err) throw err
                res.json({
                    dbArticle: data
                })
            })
        })
    }
}