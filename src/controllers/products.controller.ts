import { Router } from 'express';
import ProductsRepository from '../repositories/products.repository';
import ProductsService from '../services/products.service';

const productsRouter = Router();
const productsRepository = new ProductsRepository();
const productsService = new ProductsService(productsRepository);

productsRouter.route('/api/products')
  .get((req, res) => {
    const products = productsService.getAllItems();

    return res.status(200).json({
      products,
    });
  })
  .post((req, res) => {
    const product = productsService.create(req.body);

    return res.status(201).json({
      product,
    });
  });

productsRouter.route('/api/products/:id')
  .get((req, res) => {
    const product = productsService.getOneById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      product,
    });
  })
  .patch((req, res) => {
    const product = productsService.update(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      product,
    });
  })
  .delete((req, res) => {
    const found = productsService.deleteOneById(req.params.id);

    if (!found) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  });

export default productsRouter;
