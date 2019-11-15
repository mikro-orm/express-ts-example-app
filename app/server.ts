import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from 'mikro-orm';

import { AuthorController, BookController } from './controllers';
import { Author, Book, BookTag, Publisher } from './entities';
import { BaseEntity } from './entities/BaseEntity';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  authorRepository: EntityRepository<Author>,
  bookRepository: EntityRepository<Book>,
};

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  DI.orm = await MikroORM.init({
    entities: [Author, Book, BookTag, Publisher, BaseEntity],
    entitiesDirsTs: ['app/entities'],
    dbName: 'mikro-orm-express-ts',
    logger: console.log.bind(console),
    debug: true,
  });
  DI.em = DI.orm.em;
  DI.authorRepository = DI.orm.em.getRepository(Author);
  DI.bookRepository = DI.orm.em.getRepository(Book);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use('/author', AuthorController);
  app.use('/book', BookController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();
