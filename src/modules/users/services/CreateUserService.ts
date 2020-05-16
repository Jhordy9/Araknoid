import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class CreateUserService {
  public async execute({
    login,
    email,
    password,
    nickName,
    mainLane,
    secondaryLane,
    elo,
  }: ICreateUserDTO): Promise<User> {
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
