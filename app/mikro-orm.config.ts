import { Options } from '@mikro-orm/core';
import { Author, Book, BookTag, Publisher } from './entities';
import { BaseEntity } from './entities/BaseEntity';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';

const options: Options = {
  type: 'mongo',
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  entitiesTs: ['app/entities'],
  dbName: 'mikro-orm-express-ts',
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;
