// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const { app, query } = require("../index");
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // ARTICLE", async () => {
  let articles = {};

  // Loop for create Customer before 'it'
  beforeEach(async () => {
    let sql = `INSERT INTO articles SET articlename= "BRUNO", image= "default.png", content= "Bruno le plus beau"`;
    const article = await db.query(sql);

    // console.log("Before EACH: ", user);
    // assert.ok(user.insertId);

    const articleID = await db.query(
      `SELECT * FROM articles where id = ${article.insertId}`
    );
    
    articleArray = articleID[0];
    articleID[0].articlename.should.be.a("string");
    articleID[0].image.should.be.a("string");
    articleID[0].content.should.be.a("string");
  });

  // Exemple
  it("Exemple", (done) => {
    done();
  });

  // Test get /fev
  it(" ChaiRouter // Get Article", async (done) => {
    // test route Get
    chai
      .request(app)
      .get("/back/v1/article")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Test get /fev
  it(" ChaiRouter // Get ID Article", async (done) => {
    // test route Get
    chai
      .request(app)
      .get(`/back/v1/article/${articles.id}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        // console.log(res.body)
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Test Post
  // (name,email,mobile)
  it(" ChaiRouter // Post Article", async (done) => {
    const body = {
      name: "Bruno Chai",
      image: "brchai@no.fr",
      content: "0909090909",
    };

    chai
      .request(app)
      .post("/back/v1/article")
      .set("Accept", "application/json")
      .send(body)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Test Put /path:id
  // (name,email,mobile)
  it(" ChaiRouter // Put Article", async (done) => {
    const body = {
      name: "Bruno Edit Chai",
      image: "brchai@no.fr",
      content: "0909090909",
    };

    // Test route Put
    chai
      .request(app)
      .put(`/back/v1/article/${articles.id}`)
      .set("Accept", "application/json")
      .send(body)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Delete ID
  it(" ChaiRouter // Delete ID Article", async (done) => {
    // Test route Delete
    chai
      .request(app)
      .delete(`/back/v1/article/${articles.id}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });

  // Delete All
  it(" ChaiRouter // Delete Article", async (done) => {
    // Test route Delete
    chai
      .request(app)
      .delete("/back/v1/article")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.dbArticle.should.be.a("array");
        done();
      });
  });
});
