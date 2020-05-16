import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByLogin(login: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByNickName(nickName: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
