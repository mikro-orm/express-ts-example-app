import { Entity, Enum, OneToMany, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/decorators/legacy';
import { ObjectId, Collection } from '@mikro-orm/mongodb';
import { Book } from './Book';

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}

@Entity()
export class Publisher {

  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Enum(() => PublisherType)
  type: PublisherType;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  constructor(name: string, type = PublisherType.LOCAL) {
    this.name = name;
    this.type = type;
  }

}
