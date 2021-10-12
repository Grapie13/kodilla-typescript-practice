import BaseRepository from './base.repository';
import User from '../interfaces/user.interface';

class UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): User {
    return this.items.find((item) => item.email === email) as User;
  }
}

export default UsersRepository;
