var assert = require("assert");
const { query } = require("../index"); // import to server.js

describe("MOCHA // CRUD // Articles", () => {
  let articles = {};
  let id = 0;

  // Loop for create Article before 'it'
  beforeEach(async () => {
    // let values = ["BRUNO", "default.png", "Bruno le plus beau"];
    let sql = `INSERT INTO articles SET articlename= "BRUNO", image= "default.png", content= "Bruno le plus beau"`;
    const article = await db.query(sql);

    // console.log("Before EACH: ", user);
    assert.ok(article.insertId);

    const articleID = await db.query(`SELECT * FROM articles where id = ${ article.insertId }`)
    articles = articleID[0]
    assert.strictEqual(articleID[0].articlename, "BRUNO");
    assert.strictEqual(articleID[0].image, "default.png");
    assert.strictEqual(articleID[0].content, "Bruno le plus beau");

  });

  // Test
  it("TEST // Articles", (done) => {
    // console.log("TEST: ", id)
    done();
  });

  // Create Article
  it("POST // Articles", async () => {
    // let values = ["Node", "default.png", "0404040404"];
    let sql = `INSERT INTO articles SET articlename= "Node", image= "default.png", content= "0404040404"`;
    const article = await db.query(sql);

    // console.log("POST: ", user.insertId)

    assert.ok(article);

    const articleID = await db.query(
      `SELECT * FROM articles where id = ${article.insertId}`
    );
    assert.strictEqual(articleID[0].articlename, "Node");
    assert.strictEqual(articleID[0].image, "default.png");
    assert.strictEqual(articleID[0].content, "0404040404");
  });

  // Get ALL Article
  it("GET ALL // Article", async () => {
    let sql = `SELECT * FROM articles`;
    const listArticles = await db.query(sql);

    // console.log('GET ALL: ', listUser)

    assert.ok(listArticles);

    const articlesSelect = await db.query(`SELECT * FROM articles`);
    assert.strictEqual(articlesSelect.length > 0, true);
  });

  // Get ID Article
  it("GET ID // Article", async () => {
    // Récupère l'id du BeforeEach
    let sql = `SELECT * FROM articles WHERE id = ${articles.id}`;
    const articleID = await db.query(sql);

    // console.log('GETID: ', articleID)

    assert.ok(articleID);
  });

  // Edit Articles
  it("PUT ID // Article", async () => {
    // console.log("EDITT: ", articles);
    let sql = `UPDATE articles
                 SET articlename   = 'Test Edit',
                     image = '0909090909',
                     content  = 'te@st.com'
                 WHERE  id  = '${articles.id}';`;

    const article = await db.query(sql);
    const articleID = await db.query(
      `SELECT * FROM articles WHERE id = ${articles.id}`
    );

    // console.log('PUT: ', articleID)

    assert.ok(articleID);

    assert.strictEqual(articleID[0].articlename, "Test Edit");
    assert.strictEqual(articleID[0].image, "0909090909");
    assert.strictEqual(articleID[0].content, "te@st.com");
  });

  // Delete ID
  it("DELETE ID // Article", async () => {
    let sql = `DELETE FROM articles WHERE id = ${articles.id}`;
    await db.query(sql);

    // console.log("DELETE ID: ", articleID);

    const articleID = await db.query(
      `SELECT * FROM articles where id = ${articles.id}`
    );
    assert.ok(articleID);
    assert.strictEqual(articleID.length, 0);
  });

  // à décommenter pour tout supprimer
  // Delete ALL
  it("DELETE ALL // Article", async () => {
    let sql = `DELETE FROM articles`;
    const article = await db.query(sql);

    // console.log('DELETE ALL: ', listUser.length)

    const listArticle = await db.query("SELECT * FROM articles");
    assert.strictEqual(listArticle.length, 0);
  });

});
