import { Router } from 'express';
import UsersRepository from '../repositories/users.repository';
import UsersService from '../services/users.service';

const usersRouter = Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

usersRouter.route('/api/users')
  .get((req, res) => {
    const users = usersService.getAllItems();

    return res.status(200).json({
      users,
    });
  })
  .post((req, res) => {
    const found = usersService.getOneByEmail(req.body.email);

    if (found) {
      return res.status(400).json({
        message: 'A user with that email already exists',
      });
    }

    const userBirthday = new Date(req.body.birthday);

    const user = usersService.create({
      ...req.body,
      birthday: userBirthday,
    });

    return res.status(201).json({
      user,
    });
  });

// All these not found messages deserve an error class,
// but there's no time for that :)
usersRouter.route('/api/users/:id')
  .get((req, res) => {
    const user = usersService.getOneById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      user,
    });
  })
  .patch((req, res) => {
    const user = usersService.update(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      user,
    });
  })
  .delete((req, res) => {
    const found = usersService.deleteOneById(req.params.id);

    if (!found) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  });

export default usersRouter;
