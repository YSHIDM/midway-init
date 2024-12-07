import { Provide } from '@midwayjs/decorator';
import { Person } from '../entity';
import { BaseService } from './base';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class PersonService extends BaseService<Person> {
  @InjectEntityModel(Person)
  declare model: Repository<Person>
  async getPerson() {
    this.model.find()
  }
}
