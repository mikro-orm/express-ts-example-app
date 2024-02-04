import { ObjectId, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/mongodb';

export abstract class BaseEntity {

  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

}
