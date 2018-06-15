//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Tour = require('../src/models/tour');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let sample = require('./sampleData/sampleTour');
//let should = chai.should();
let assert = chai.assert;
chai.use(chaiHttp);
//Our parent block
describe('Tours', () => {
    beforeEach((done) => { //Before each test we empty the database
        Tour.remove({}, (err) => {
            done();
        });
    });

    /*afterEach((done) => {
        Tour.remove({}, (err) => {
            done();
        });
    });*/
    /*
      * Test the /GET route
      */
    describe('/GET tours', () => {
        it('it should GET empty tours array', (done) => {
            chai.request(server)
                .get('/tours')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should GET non empty tours array', (done) => {
            Tour.create(sample, (err) => {
                chai.request(server)
                    .get('/tours')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        res.body[0].name.should.be.eql(sample.name);
                        done();
                    });
            });

        });
    });

    describe('/POST tours', () => {
        it('it should CREATE a tour', (done) => {
            chai.request(server)
                .post('/tours')
                .send(sample)
                .end((err, res) => {
                    assert(err == null, 'there is an error');
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.name.should.be.eql(sample.name);
                    done();
                });
        });
    });


    describe('search for tours', () => {
        it('it should find a tour', (done) => {
            chai.request(server)
                .post('/tours')
                .send(sample)
                .end((err, res) => {
                    assert(err == null, 'there is an error');
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.name.should.be.eql(sample.name);
                    done();
                });
        });
    });

});