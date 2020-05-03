import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  login: string;
  email: string;
  password: string;
  nickName: string;
  mainLane: string;
  secondaryLane: string;
  elo: string;
}

class CreateUserService {
  public async execute({
    login,
    email,
    password,
    nickName,
    mainLane,
    secondaryLane,
    elo,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserLogin = await userRepository.findOne({
      where: { login },
    });

    if (checkUserLogin) {
      throw new AppError('login/email or nick already used', 401);
    }
    const checkUserEmail = await userRepository.findOne({
      where: { email },
    });

    if (checkUserEmail) {
      throw new AppError('login/email or nick already used', 401);
    }
    const checkUserNickName = await userRepository.findOne({
      where: { nickName },
    });

    if (checkUserNickName) {
      throw new AppError('login/email or nick already used', 401);
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      login,
      email,
      password: hashPassword,
      nickName,
      mainLane,
      secondaryLane,
      elo,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
