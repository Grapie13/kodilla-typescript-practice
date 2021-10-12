import BaseRepository from './base.repository';
import Product from '../interfaces/product.interface';

class ProductsRepository extends BaseRepository<Product> {
  findOneByName(name: string) {
    return this.items.find((product) => product.name === name);
  }
}

export default ProductsRepository;
