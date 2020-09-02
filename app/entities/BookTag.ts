import { ObjectId } from '@mikro-orm/mongodb';
import { Collection, Entity, ManyToMany, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { Book } from '.';

@Entity()
export class BookTag {

  @PrimaryKey()
  _id!: ObjectId;

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
