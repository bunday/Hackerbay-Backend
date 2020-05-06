let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index");
let should = chai.should();

chai.use(chaiHttp);

describe("Hackerbay.io API", () => {
  let token;

  /**
   * Test for server is active
   */

  describe("Index", () => {
    it("it should return 200", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test for Login
   */
  describe("Required Login Parameters", () => {
    it("it should return 400", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.a.property("error");
          done();
        });
    });

    it("it should return 200 with a token", (done) => {
      let user = {
        username: "zadat",
        password: "olayinka",
      };
      chai
        .request(server)
        .post("/api/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.a.property("token");
          token = res.body.token;
          done();
        });
    });
  });

  /**
   * Test for Json Patch
   */
  describe("Json Patch", () => {
    let requestBody = {
        content: {
            username: "zadat",
            password: "olayinka",
            location: "nigeria"
        },
        operation: [
            { "op": "replace", "path": "/password", "value": "authenticated" },
            { "op": "add", "path": "/occupation", "value": "engineer" },
            { "op": "remove", "path": "/location" }
        ],
      };

    it("it should return 401 for unathorized access", (done) => {
      chai
        .request(server)
        .post("/api/patch")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.a.property("message");
          done();
        });
    });

    it("it should return 200 with a patched object", (done) => {
      chai
        .request(server)
        .post("/api/patch")
        .send(requestBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.a.property("message");
          res.body.should.have.a.property("data");
          res.body.data.should.have.a.property("occupation"); // newly added field
          res.body.data.should.not.have.a.property("location"); // removed field
          done();
        });
    });
})

    /**
   * Test for Json Patch
   */
  describe("Json Patch", () => {
    let requestBody = {
        content: {
            username: "zadat",
            password: "olayinka",
            location: "nigeria"
        },
        operation: [
            { "op": "replace", "path": "/password", "value": "authenticated" },
            { "op": "add", "path": "/occupation", "value": "engineer" },
            { "op": "remove", "path": "/location" }
        ],
      };

    it("it should return 401 for unathorized access", (done) => {
      chai
        .request(server)
        .post("/api/patch")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.a.property("message");
          done();
        });
    });

    it("it should return 200 with a patched object", (done) => {
      chai
        .request(server)
        .post("/api/patch")
        .send(requestBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.a.property("message");
          res.body.should.have.a.property("data");
          res.body.data.should.have.a.property("occupation"); // newly added field
          res.body.data.should.not.have.a.property("location"); // removed field
          done();
        });
    });
  });

   /**
   * Test for Image Thumbnail
   */
  describe("Image Thumbnail", () => {
    let requestBody = {
        link: "https://miro.medium.com/max/1400/1*mk1-6aYes1E3Imhc0A.jpeg",
      };

    it("it should return 401 for unathorized access", (done) => {
      chai
        .request(server)
        .post("/api/thumbnail")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.a.property("message");
          done();
        });
    });

    it("it should return 200 with a public link to the thumbnaul", (done) => {
      chai
        .request(server)
        .post("/api/thumbnail")
        .send(requestBody)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.a.property("message");
          res.body.should.have.a.property("message");
          res.body.should.have.a.property("link"); 
          done();
        });
    });
  });
});
