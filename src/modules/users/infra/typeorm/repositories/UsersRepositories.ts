import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const checkEmailExists = await this.ormRepository.findOne({
      where: { email },
    });

    return checkEmailExists;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const checkLoginExists = await this.ormRepository.findOne({
      where: { login },
    });

    return checkLoginExists;
  }

  public async findByNickName(nickName: string): Promise<User | undefined> {
    const checkNickNameExists = await this.ormRepository.findOne({
      where: { nickName },
    });

    return checkNickNameExists;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
