import BaseService from './base.service';
import User from '../interfaces/user.interface';
import UsersRepository from '../repositories/users.repository';

class UsersService extends BaseService<User> {
  constructor(protected readonly repository: UsersRepository) {
    super(repository);
  }

  getOneByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
}

export default UsersService;
