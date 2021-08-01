const chai = require('chai');
const chaiHttp = require('chai-http');
const { request } = require('express');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, director_id;

describe('/api/director test', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'mehmet', password: '12345' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET director', () => {
        it('it should GET all the director', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST director', () => {
        it('it should POST a director', (done) => {

            const director = {
                name: 'Mehmet',
                surname: 'Borekci',
                bio: 'Brkc'
            };

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    director_id = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id director', () => {
        it('it should GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body);
                    res.should.be.a('object');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('surname');
                    res.body[0].should.have.property('bio');
                    //res.body[0].should.have.property('_id').eql(director_id);
                    done();
                });
        });
    });

    describe('/PUT/:director_id director', () => {
        it('it should UPDATE a director by the given id', (done) => {

            const director = {
                name: 'Ezgi',
                surname: 'Kucukaydın Borekci',
                bio: 'Ebrkc'
            };

            chai.request(server)
                .put('/api/directors/' + director_id)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });
    });

    describe('/DELETE/:director_id director', () => {
        it('it should DELETE a movie by the given id', (done) => {
            chai.request(server)
                .delete('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});

