let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe("Hackerbay.io API", () => {
    let token;
    
    /**
     * Test for server is active
     */
  
    describe("Index", () => {
      it("it should return 200", done => {
        chai.request(server)
          .get("/")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    describe("Required Login Parameters", () => {
        it("it should return 400", done => {
          chai.request(server)
            .post("/api/login")
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object')
              res.body.should.have.a.property('error')
              done();
            });
        });

        it("it should return 200 with a token", done => {
            let user = {
                username: "zadat",
                password: "olayinka"
            }
            chai.request(server)
              .post("/api/login")
              .send(user)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.a.property('token')
                done();
              });
          });

      });
});