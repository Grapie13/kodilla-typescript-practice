import { v4 as uuid } from 'uuid';
import BaseInterface from '../interfaces/base.interface';

abstract class BaseRepository<T extends BaseInterface> {
  protected items: T[] = [];

  find(): T[] {
    return this.items;
  }

  findOne(id: string): T {
    return this.items.find((item) => item.id === id) as T;
  }

  create(item: T): T {
    const currentDate = new Date();
    const createdItem = {
      ...item,
      id: uuid(),
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.items.push(createdItem);

    return createdItem;
  }

  update(id: string, itemUpdate: T): T {
    const found = this.findOne(id);

    if (!found) {
      return found as T;
    }

    this.items = this.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...itemUpdate,
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: new Date(),
        };
      }

      return item;
    });

    return this.findOne(id);
  }

  delete(id: string): boolean {
    const deletedItem = this.findOne(id);

    if (!deletedItem) {
      return false;
    }

    this.items = this.items.filter((item) => item.id !== id);

    return true;
  }
}

export default BaseRepository;
