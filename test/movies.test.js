const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Movie = require('../src/models/Movie');
const Genre = require('../src/models/Genre');

describe('Movies API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL|| 'mongodb://netflix_lightpond:e54d96ec76d86f657f2fd22cddb0f81ed277d0df@u1z.h.filess.io:27017/netflix_lightpond');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Movie.deleteMany();
    await Genre.deleteMany();
  });

  test('should create a movie', async () => {
    const genre = await Genre.create({ name: 'Action', description: 'Action-packed movies' });
    const response = await request(app)
      .post('/movies')
      .send({ 
        name: 'Inception', 
        description: 'A mind-bending thriller', 
        releaseDate: '2010-07-16', 
        genre: [genre._id], 
        duration: 148, 
        rating: 8.8 
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Inception');
  });

  test('should retrieve a list of movies', async () => {
    const genre = await Genre.create({ name: 'Action', description: 'Action-packed movies' });
    await Movie.create({ 
      name: 'Inception', 
      description: 'A mind-bending thriller', 
      releaseDate: '2010-07-16', 
      genre: [genre._id], 
      duration: 148, 
      rating: 8.8 
    });
    const response = await request(app).get('/movies');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
