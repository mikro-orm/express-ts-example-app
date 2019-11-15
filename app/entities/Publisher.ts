import { ObjectID } from 'mongodb';
import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, SerializedPrimaryKey, MongoEntity } from 'mikro-orm';
import { Book } from '.';

@Entity()
export class Publisher implements MongoEntity<Publisher> {

  @PrimaryKey()
  _id!: ObjectID;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Enum()
  type: PublisherType;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  constructor(name: string, type = PublisherType.LOCAL) {
    this.name = name;
    this.type = type;
  }

}

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}
