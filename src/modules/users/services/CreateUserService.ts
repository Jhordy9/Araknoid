import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepository,

    @inject('BCryptHashProvider')
    private hashProvider: IHashProvider,
  ) {
    /** */
  }

  async execute({
    elo,
    email,
    login,
    mainLane,
    nickName,
    password,
    secondaryLane,
  }: ICreateUserDTO): Promise<User> {
    const checkLoginExists = await this.usersRepository.findByLogin(login);

    if (checkLoginExists) {
      throw new AppError('login, email or nick name already used.');
    }

    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('login, email or nick name already used.');
    }

    const checkNickNameExists = await this.usersRepository.findByNickName(
      nickName,
    );

    if (checkNickNameExists) {
      throw new AppError('login, email or nick name already used.');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      login,
      email,
      nickName,
      password: hashPassword,
      elo,
      mainLane,
      secondaryLane,
    });

    return user;
  }
}

export default CreateUserService;
