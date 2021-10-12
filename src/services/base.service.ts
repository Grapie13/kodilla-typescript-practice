import BaseRepository from '../repositories/base.repository';

abstract class BaseService<T> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  getAllItems() {
    return this.repository.find();
  }

  getOneById(id: string) {
    return this.repository.findOne(id);
  }

  create(item: T) {
    return this.repository.create(item);
  }

  update(id: string, item: T) {
    return this.repository.update(id, item);
  }

  deleteOneById(id: string) {
    return this.repository.delete(id);
  }
}

export default BaseService;
