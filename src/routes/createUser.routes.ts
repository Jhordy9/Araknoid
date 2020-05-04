import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ['nickName', 'mainLane', 'secondaryLane', 'elo'],
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const {
    login,
    email,
    password,
    nickName,
    mainLane,
    secondaryLane,
    elo,
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    login,
    email,
    password,
    nickName,
    mainLane,
    secondaryLane,
    elo,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
