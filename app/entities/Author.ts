import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne } from 'mikro-orm';

import { Book } from '.';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Author extends BaseEntity {

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted = false;

  @Property()
  born?: Date;

  @OneToMany({ cascade: [Cascade.PERSIST, Cascade.REMOVE] })
  books = new Collection<Book>(this);

  @ManyToOne()
  favouriteBook?: Book;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }

}
