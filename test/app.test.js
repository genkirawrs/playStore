const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('PlayStore App', () => {
  it('should return status 200 from GET /apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should return an array of some length', () => {
    return supertest(app)
      .get('/apps') // invoke the endpoint
      .expect(200)  // assert that you get a 200  OK status
      .expect('Content-Type', /json/)
      .then(res => {
        // make sure you get an array
        expect(res.body).to.be.an('array');
        // array must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });

  it('should generate an array length of 6 with a genre search of "action"', () => {
    return supertest(app)
      .get('/apps') // invoke the endpoint
      .query({ search: 'action' }) 
      .expect(200)  // assert that you get a 200  OK status
      .expect('Content-Type', /json/)
      .then(res => {
        // make sure you get an array
        expect(res.body).to.be.an('array');
        // array must not be empty
        expect(res.body).to.have.lengthOf(6);
      });
  });

  it('should be 400 if search is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ search: 'MISTAKE' })
      .expect(400, 'Search must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be either "app" or "rating"');
  });


});
