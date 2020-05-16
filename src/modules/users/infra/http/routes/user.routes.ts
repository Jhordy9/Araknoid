import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/', userController.create);

export default usersRouter;
