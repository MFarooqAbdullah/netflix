const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Genre = require('../src/models/Genre');

describe('Genres API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL|| 'mongodb://netflix_lightpond:e54d96ec76d86f657f2fd22cddb0f81ed277d0df@u1z.h.filess.io:27017/netflix_lightpond');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Genre.deleteMany();
  });

  test('should create a genre', async () => {
    const response = await request(app)
      .post('/genres')
      .send({ name: 'Action', description: 'Action-packed movies' });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Action');
  });

  test('should retrieve a list of genres', async () => {
    await Genre.create({ name: 'Action', description: 'Action-packed movies' });
    const response = await request(app).get('/genres');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
