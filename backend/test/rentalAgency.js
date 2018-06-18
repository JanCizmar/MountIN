let RentalAgency = require('../src/models/rentalAgency');

let chai = require('chai');
let should = require('chai').should();
let chaiHttp = require('chai-http');
let server = require('../index');
let rentalAgenciesSample = require('./sampleData/sampleRentalAgency');

chai.use(chaiHttp);

describe('User tests', function() {
    beforeEach(function(done) {
        RentalAgency.remove({}, function() {
            done();
        });
    });

    describe('/GET rentalAgency', function() {
        it('it should return a bad request error', function (done) {
            chai.request(server)
                .get('/rentalAgency')
                .end(function (err, res) {
                    should.not.exist(err);
                    res.should.have.status(400);
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
                    should.not.exist(err);
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
                    should.not.exist(err);
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
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.eql(2);
                    done()
                });
        });
    });
});