//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const RentalAgency = require('../src/models/rentalAgency');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const rentalAgenciesSample = require('./sampleData/sampleRentalAgency');

chai.use(chaiHttp);

describe('User tests', function() {
    beforeEach(function(done) {
        setTimeout(
        RentalAgency.remove({}, function() {
            done();
        }), 10000)
    });

    describe('/GET rentalAgency', function() {
        it('it should return a bad request error', function (done) {
            chai.request(server)
                .get('/rentalAgency')
                .end(function (err, res) {
                    err.should.be.null;
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.keys('error', 'message');
                    res.body.error.should.eql('Bad request');
                    res.body.message.should.eql('Latitude or longitude not specified');
                    done();
                });
        });
        it('it should return an empty array', function (done) {
            chai.request(server)
                .get('/rentalAgency')
                .query({lat: 0, lng: 0})
                .end(function (err, res) {
                    err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.eql(0);
                    done();
                });
        });
        it('it should return three rental agencies', function (done) {
            RentalAgency.create(rentalAgenciesSample[0]);
            RentalAgency.create(rentalAgenciesSample[1]);
            RentalAgency.create(rentalAgenciesSample[2]);
            chai.request(server)
                .get('/rentalAgency')
                .query({lat: 48.146076, lng: 11.564215})
                .end(function (err, res) {
                    err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.eql(3);
                    done()
                });
        });
        it('it should return two rental agencies', function (done) {
            RentalAgency.create(rentalAgenciesSample[0]);
            RentalAgency.create(rentalAgenciesSample[1]);
            RentalAgency.create(rentalAgenciesSample[2]);
            chai.request(server)
                .get('/rentalAgency')
                .query({lat: 48.146076, lng: 11.564215, distance: 1})
                .end(function (err, res) {
                    err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.eql(2);
                    done()
                });
        });
    });
});