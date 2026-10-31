const request = require('supertest');
const app = require('./app');

describe('API de tareas', () => {
  test('GET / responde 200 con el mensaje de la version', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toContain('desplegada con AWS CodePipeline');
  });

  test('GET /tareas devuelve una lista', async () => {
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tareas crea una tarea', async () => {
    const res = await request(app).post('/tareas').send({ titulo: 'Nueva tarea' });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Nueva tarea');
  });
});
