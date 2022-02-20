import request from 'supertest';
import expect from 'expect';
import { init, app, DI } from '../server';

describe('book controller', () => {

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
      .post('/book')
      .send({ title: 'b1', author: { name: 'a1', email: 'e1' } })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe('b1');
        expect(res.body.author.name).toBe('a1');
        expect(res.body.author.email).toBe('e1');
        expect(res.body.author.termsAccepted).toBe(false);
        expect(res.body.author.books).toHaveLength(1);

        id = res.body.id;
      });

    await request(app)
      .get('/book')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body[0].id).toBeDefined();
        expect(res.body[0].title).toBe('b1');
        expect(res.body[0].author.name).toBe('a1');
        expect(res.body[0].author.email).toBe('e1');
        expect(res.body[0].author.termsAccepted).toBe(false);
      });

    await request(app)
      .put('/book/' + id)
      .send({ title: 'b2' })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe('b2');
        expect(res.body.author).toBeDefined();
      });
  });

});
