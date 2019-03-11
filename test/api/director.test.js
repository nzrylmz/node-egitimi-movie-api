const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('DIRECTORS - /api/directors tests', () => {
    before((done) => {
        chai.request(server).post('/authenticate').send({username: 'test', password: 'test123'}).end((err,res) => {
            token = res.body.token;
            done();
        });
    });
    describe('POST /directors', () => {
        it('it should POST a director', (done) => {
            const director = {
                name: 'Test Director',
                surname: 'test',
                bio: 'lorem ipsuma color dis babet'
            };

            chai.request(server).post('/api/directors').set('x-acces-token', token).send(director).end((err,res) => {
                if(err) throw err;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                res.body.should.have.property('bio').eql(director.bio);
                directorId = res.body._id;
                done();
            });
        });
    });
    describe('GET /directors', () => {
        it('it should get all directors', (done) => {
            chai.request(server).get('/api/directors').set('x-acces-token', token).end((err,res) => {
                if(err) throw err;
                res.should.have.status(200);
                done();
            });
        });
    });
    describe('GET /directors/:director_id', () => {
        it('it should GET the director', (done) => {
            chai.request(server).get('/api/directors/' + directorId).set('x-acces-token', token).end((err,res) => {
                if(err) throw err;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
                res.body.should.have.property('_id').eql(directorId);
                done();
            });
        });
    });
    describe('PUT /directors/:director_id', () => {
        it('it should PUT(update) the POSTed test director', (done) => {
            const putDirector = {
                name: 'Test Director',
                surname: 'test',
                bio: 'lorem ipsuma color dis babet'
            };

            chai.request(server).put('/api/directors/' + directorId).set('x-acces-token', token).send(putDirector).end((err,res) => {
                if(err) throw err;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(putDirector.name);
                res.body.should.have.property('surname').eql(putDirector.surname);
                res.body.should.have.property('bio').eql(putDirector.bio);
                res.body.should.have.property('_id').eql(directorId);
                done();
            });
        });
    });
    describe('DELETE /directors/:director_id', () => {
        it('it should DELETE the POSTed test director', (done) => {
            chai.request(server).delete('/api/directors/' + directorId).set('x-acces-token', token).end((err,res) => {
                if(err) throw err;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(directorId);
                done();
            });
        });
    });
});