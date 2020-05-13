const request = require('supertest');
const app = require('../app');

describe('games', () => {
  it('should shoud return 200 OK', async () => {
    const res = await request(app)
      .get('/games');
     
    expect(res.statusCode).toEqual(200)
   })
})
