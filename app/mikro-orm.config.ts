import { defineConfig } from '@mikro-orm/mongodb';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { Author, Book, BookTag, Publisher, BaseEntity } from './entities';

export default defineConfig({
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  metadataProvider: ReflectMetadataProvider,
  dynamicImportProvider: id => import(id),
  debug: true,
});
