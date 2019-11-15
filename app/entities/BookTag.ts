import { ObjectID } from 'mongodb';
import { Collection, Entity, ManyToMany, MongoEntity, PrimaryKey, Property, SerializedPrimaryKey } from 'mikro-orm';
import { Book } from '.';

@Entity()
export class BookTag implements MongoEntity<BookTag> {

  @PrimaryKey()
  _id!: ObjectID;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @ManyToMany(() => Book, b => b.tags)
  books: Collection<Book> = new Collection<Book>(this);

  constructor(name: string) {
    this.name = name;
  }

}
