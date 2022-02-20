import request from 'supertest';
import expect from 'expect';
import { app, DI, init } from '../server';

describe('author controller', () => {

  beforeAll(async () => {
    await init;
    DI.orm.config.set('dbName', 'express-test-db');
    DI.orm.config.getLogger().setDebugMode(false);
    await DI.orm.config.getDriver().reconnect();
    await DI.orm.getSchemaGenerator().clearDatabase();
  });

  afterAll(async () => {
    await DI.orm.close(true);
    DI.server.close();
  });

  it(`CRUD`, async () => {
    let id;

    await request(app)
      .post('/author')
      .send({ name: 'a1', email: 'e1', books: [{ title: 'b1' }, { title: 'b2' }] })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe('a1');
        expect(res.body.email).toBe('e1');
        expect(res.body.termsAccepted).toBe(false);
        expect(res.body.books).toHaveLength(2);

        id = res.body.id;
      });

    await request(app)
      .get('/author')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBeDefined();
        expect(res.body[0].name).toBe('a1');
        expect(res.body[0].email).toBe('e1');
        expect(res.body[0].termsAccepted).toBe(false);
        expect(res.body[0].books).toHaveLength(2);
      });

    await request(app)
      .put('/author/' + id)
      .send({ name: 'a2' })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe('a2');
        expect(res.body.email).toBe('e1');
        expect(res.body.termsAccepted).toBe(false);
      });
  });

});
