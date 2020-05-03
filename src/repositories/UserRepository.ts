import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

interface RequestUser {
  nickName: string;
  mainLane: string;
  secondaryLane: string;
  elo: string;
}

@EntityRepository(User)
class UserRepository extends Repository<RequestUser> {
  public async getUser(): Promise<RequestUser[]> {
    const users = await this.find();

    return users;
  }
}

export default UserRepository;
