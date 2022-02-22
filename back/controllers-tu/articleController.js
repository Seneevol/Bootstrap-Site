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

        console.log(req.params);

        await db.query(`SELECT * FROM articles WHERE id = ${req.params.id}`, async (err, data, fields) => {
            if (err) throw error
            res.json({
                dbArticle: data
            })
        })
    },

    post: async (req, res) => {

        const {
            name,
            content,
            link,
            avatar
        } = req.body

        let sql = `INSERT INTO articles SET articlename= :name, image= :avatar, content= :content, link= :link;`

        await db.query(sql, { name, avatar, content, link }, async (err, data, fields) => {
            if (err) throw err
            await db.query(`SELECT * FROM articles`, (err, data, fields) => {
                if (err) throw err
                console.log(`OUAIS OUAIS OUAIS ON A CREE LAREUTICLEUH`);
                res.json({
                    dbArticle: data
                })
            })
        })
    },

    editOne: async (req, res) => {

        const {
            name,
            image,
            content,
            link
        } = req.body

        await db.query(`UPDATE articles SET articlename= :name, image= :image, content= :content, link= :link WHERE id = ${req.params.id}`, {
            name,
            image,
            content,
            link
        }, async (err, edit, fields) => {
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