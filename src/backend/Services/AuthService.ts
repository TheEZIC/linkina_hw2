import {Repository} from "typeorm/browser";
import {Database} from "../Database";
import {User} from "../entities/User.entity";

export class AuthService {
  private get userRepository(): Repository<User> {
    return Database.instance.dataSource.getRepository(User);
  }

  public signIn(login: string, password: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        credential: {
          login,
          password,
        }
      },
      relations: {
        credential: true,
      },
    });
  }

  public signUp(data: Omit<User, "id">) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
