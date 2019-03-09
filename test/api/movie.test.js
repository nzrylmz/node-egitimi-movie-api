const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server).post('/authenticate').send({username: 'test', password: 'test123'}).end((err,res) => {
            if(err) console.log('Test kullanıcısı bilgileri yanlış!');
            token = res.body.token;
            done();
        });
    });
    describe('GET /movies', () => {
        it('it should GET all movies', (done) => {
            chai.request(server).get('/api/movies').set('x-acces-token', token).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    describe('POST /movies', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'Test movie',
                category: 'Test',
                country: 'Türkiye',
                year: 1950,
                imdb_score: 9.9
            }
            chai.request(server).post('/api/movies').set('x-acces-token', token).send(movie).end((err,res) => {
                if(err) res.send('movie oluşturulamadı!');
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId = res.body._id;
                done();
            });
        });
    });
    describe('GET /:movie_id', () => {
        it('it should GET movie by the POSTed test movie', (done) => {
            chai.request(server).get('/api/movies/' + movieId).set('x-acces-token', token).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                res.body.should.have.property('_id').eql(movieId);
                done();
            });
        });
    });
});