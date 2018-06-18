const User = require('../src/models/user');

let chai = require('chai');
let should = require('chai').should();
let chaiHttp = require('chai-http');
let server = require('../index');

chai.use(chaiHttp);

describe('User tests', function() {
    beforeEach(function(done) {
        User.remove({}, function() {
            done();
        });
    });

    describe('/GET logout', function() {
        it('it should always GET an empty token', function(done) {
            chai.request(server)
                .get('/auth/logout')
                .end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    should.not.exist(res.body.token);
                    done();
                });
        });
    });
});