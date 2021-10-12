import BaseService from './base.service';
import Product from '../interfaces/product.interface';
import ProductsRepository from '../repositories/products.repository';

class ProductsService extends BaseService<Product> {
  constructor(protected readonly repository: ProductsRepository) {
    super(repository);
  }

  getOneByName(name: string) {
    return this.repository.findOneByName(name) as Product;
  }
}

export default ProductsService;
