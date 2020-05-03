import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UserRespository from '../repositories/UserRepository';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRespository);
  const users = await userRepository.getUser();

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
