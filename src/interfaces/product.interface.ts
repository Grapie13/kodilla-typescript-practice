import Tag from '../enums/tag.enum';
import BaseInterface from './base.interface';

interface Product extends BaseInterface {
  name: string;
  price: number;
  tags: Tag[];
}

export default Product;
