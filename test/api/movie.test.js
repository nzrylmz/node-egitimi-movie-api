const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('MOVIES - /api/movies tests', () => {
    before((done) => {
        chai.request(server).post('/authenticate').send({username: 'test', password: 'test123'}).end((err,res) => {
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
                director_id: '5c823945847c1514f4676c8a',
                category: 'Test',
                country: 'Türkiye',
                year: 1950,
                imdb_score: 9.9
            }
            chai.request(server).post('/api/movies').set('x-acces-token', token).send(movie).end((err,res) => {
                if(err) res.send('movie oluşturulamadı!');
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(movie.title);
                res.body.should.have.property('director_id').eql(movie.director_id);
                res.body.should.have.property('category').eql(movie.category);
                res.body.should.have.property('country').eql(movie.country);
                res.body.should.have.property('year').eql(movie.year);
                res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                movieId = res.body._id;
                done();
            });
        });
    });
    describe('GET movies/:movie_id', () => {
        it('it should GET movie the POSTed test movie', (done) => {
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
    describe('PUT movies/:movie_id', () => {
        it('it should PUT(update) movie the POSTed test movie', (done) => {
            const putMovie = {
                title: 'Test movie PUT',
                director_id: '5c823945847c1514f4676c8a',
                category: 'TestPUT',
                country: 'TürkiyePUT',
                year: 1900,
                imdb_score: 1
            }
            chai.request(server).put('/api/movies/' + movieId).set('x-acces-token', token).send(putMovie).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(putMovie.title);
                res.body.should.have.property('director_id').eql(putMovie.director_id);
                res.body.should.have.property('category').eql(putMovie.category);
                res.body.should.have.property('country').eql(putMovie.country);
                res.body.should.have.property('year').eql(putMovie.year);
                res.body.should.have.property('imdb_score').eql(putMovie.imdb_score);
                done();
            });
        });
    });
    describe('DELETE movies/:movie_id', () => {
        it('it should DELETE movie the POSTed test movie', (done) => {
            chai.request(server).delete('/api/movies/' + movieId).set('x-acces-token', token).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
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