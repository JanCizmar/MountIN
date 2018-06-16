//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const User = require('../src/models/user');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

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
                .get('/logout')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.json;
                    res.body.should.have.property('token');
                    res.body.token.should.eql(null);
                    done();
                });
        });
    });
    //TODO: Implement more auth/user tests but not important at the moment

});