import { ObjectId, Collection, Entity, ManyToMany, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/mongodb';
import { Book } from './Book';

@Entity()
export class BookTag {

  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @ManyToMany(() => Book, b => b.tags)
  books = new Collection<Book>(this);

  constructor(name: string) {
    this.name = name;
  }

}
