import { container } from 'tsyringe';

import BCryptHashProvider from '@modules/users/provider/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>(
  'BCryptHashProvider',
  BCryptHashProvider,
);
