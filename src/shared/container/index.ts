import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
