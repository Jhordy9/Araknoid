import { Router } from 'express';

import usersRouter from './createUser.routes';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
