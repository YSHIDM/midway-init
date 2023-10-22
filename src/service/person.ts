import { Provide } from '@midwayjs/decorator';
import { Person } from '../entity1/person';

@Provide()
export class PersonService {
  async createPerson() {
    const person = new Person({ name: 'bob', id: '123' });
    await person.save();
  }
}
