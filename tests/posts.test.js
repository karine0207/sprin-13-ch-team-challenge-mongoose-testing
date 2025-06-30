const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

beforeAll(async () => {
  // Opcional: usa otra URI para testing (o la misma)
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /create', () => {
  it('Debería crear una publicación válida', async () => {
    const res = await request(app)
      .post('/create')
      .send({
        title: 'Test post',
        body: 'Contenido de prueba'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test post');
  });

  it('Debería fallar si faltan campos', async () => {
    const res = await request(app)
      .post('/create')
      .send({
        title: '',
        body: ''
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('GET /', () => {
  it('Debería devolver un array de publicaciones', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

