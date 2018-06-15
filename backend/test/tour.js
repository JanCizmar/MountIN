//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Tour = require('../src/models/tour');
let User = require('../src/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let sampleUser = require('./sampleData/sampleUser');
let sample = require('./sampleData/sampleTour');
let should = chai.should();
let assert = chai.assert;
chai.use(chaiHttp);
//Our parent block

let getSampleWithUser = (tourSample) => new Promise((resolve, reject) => {
    User.create(sampleUser, (err, user) => {
        if (err === null) {
            tourSample.creator = user._id;
            resolve(tourSample);
        } else {
            reject(err)
        }
    })
});

let tourWithUserSample;

describe('Tours', () => {
    beforeEach((done) => { //Before each test we empty the database
        Tour.remove({}, (err) => {
            User.remove({}, (err) => {
                getSampleWithUser(sample).then(tour => {
                    tourWithUserSample = tour;
                    done();
                });
            });
        });
    });
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
            Tour.create(tourWithUserSample, (err) => {
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
        it('it should NOT CREATE a tour with no creator', (done) => {
            delete tourWithUserSample.creator;
            chai.request(server)
                .post('/tours')
                .send(tourWithUserSample)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql('Creator does not exist');
                    done();
                })
        });

        it('it should NOT CREATE a tour with malformed creator', (done) => {
            tourWithUserSample.creator = '5b238097e52abc813defe899';
            //console.log(tourWithUserSample);
            chai.request(server)
                .post('/tours')
                .send(tourWithUserSample)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    console.log(res.body);
                    res.body.message.should.be.eql('Creator does not exist');
                    done();
                })
        });

        it('it should CREATE a tour', (done) => {
            chai.request(server)
                .post('/tours')
                .send(tourWithUserSample)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.name.should.be.eql(sample.name);
                    done();
                })
        });
    });


    describe('it should find tour with difficulty every condition passed', () => {
        it('it should find a tour', (done) => {
            let searchString = 'difficulties=1,2,3&guideTypes=1,2&dateAfter=2018-05-25T13:30:15&dateBefore=2018-06-30T13:30:15&activityTypes=1,2,3,4&lat=48.1832805&lng=11.627528100000063&distance=10';
            Tour.create(tourWithUserSample, (err) => {
                chai.request(server)
                    .get('/tours/search?' + searchString)
                    .end((err, res) => {
                        assert(err == null, 'there is an error');
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0].name.should.be.eql(sample.name);
                        done();
                    });
            });
        });
    });

    describe('it should not find tour when difficulty 1 is missing', () => {
        it('it should find a tour', (done) => {
            let searchString = 'difficulties=2,3&guideTypes=1,2&dateAfter=2018-05-25T13:30:15&dateBefore=2018-06-30T13:30:15&activityTypes=1,2,3,4&lat=48.1832805&lng=11.627528100000063&distance=10';
            Tour.create(tourWithUserSample, (err) => {
                chai.request(server)
                    .get('/tours/search?' + searchString)
                    .end((err, res) => {
                        assert(err == null, 'there is an error');
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });

    describe('it should not find tour when guide type 1 is missing', () => {
        it('it should find a tour', (done) => {
            let searchString = 'difficulties=1,2,3&guideTypes=2&dateAfter=2018-05-25T13:30:15&dateBefore=2018-06-30T13:30:15&activityTypes=1,2,3,4&lat=48.1832805&lng=11.627528100000063&distance=10';
            Tour.create(tourWithUserSample, (err) => {
                chai.request(server)
                    .get('/tours/search?' + searchString)
                    .end((err, res) => {
                        assert(err == null, 'there is an error');
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });

    describe('it should not find tour when dates are out of rande', () => {
        it('it should find a tour', (done) => {
            let searchString = 'difficulties=1,2,3&guideTypes=1,2&dateAfter=2018-06-30T13:30:15&dateBefore=2018-07-30T13:30:15&activityTypes=1,2,3,4&lat=48.1832805&lng=11.627528100000063&distance=10';
            Tour.create(tourWithUserSample, (err) => {
                chai.request(server)
                    .get('/tours/search?' + searchString)
                    .end((err, res) => {
                        assert(err == null, 'there is an error');
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });

    describe('it should not find tour when activityType 1 is missing', () => {
        it('it should find a tour', (done) => {
            let searchString = 'difficulties=1,2,3&guideTypes=1,2&dateAfter=2018-03-30T13:30:15&dateBefore=2018-07-30T13:30:15&activityTypes=2,3,4&lat=48.1832805&lng=11.627528100000063&distance=10';
            Tour.create(tourWithUserSample, (err) => {
                chai.request(server)
                    .get('/tours/search?' + searchString)
                    .end((err, res) => {
                        assert(err == null, 'there is an error');
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });

    describe('it should not find tour when tour is too far from location', () => {
        it('it should find a tour', (done) => {
            let searchString = 'difficulties=1,2,3&guideTypes=1,2&dateAfter=2018-03-30T13:30:15&dateBefore=2018-07-30T13:30:15&activityTypes=1,2,3,4&lat=44.1832805&lng=11.627528100000063&distance=1';
            Tour.create(tourWithUserSample, (err) => {
                chai.request(server)
                    .get('/tours/search?' + searchString)
                    .end((err, res) => {
                        assert(err == null, 'there is an error');
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });
});