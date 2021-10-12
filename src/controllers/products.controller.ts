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
    const found = productsService.getOneByName(req.body.name);

    if (found) {
      return res.status(400).json({
        message: 'A product with that name already exists',
      });
    }

    const product = productsService.create(req.body);

    return res.status(201).json({
      product,
    });
  });

productsRouter.route('/api/products/:id')
  .get((req, res) => {
    const idOrName = req.params.id;

    let product = productsService.getOneById(idOrName);

    if (!product) {
      product = productsService.getOneByName(idOrName);

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
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
