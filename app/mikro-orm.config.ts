import { defineConfig } from '@mikro-orm/mongodb';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { Author, Book, BookTag, Publisher, BaseEntity } from './entities';

export default defineConfig({
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  highlighter: new MongoHighlighter(),
  debug: true,
});
