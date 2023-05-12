import {database} from "../Database";
import {User} from "../entities/User.entity";

export const authService = {
  get userRepository() {
    return database.dataSource.getRepository(User);
  },
  signIn(login: string, password: string): Promise<User | null> {
    return authService.userRepository.findOne({
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
  },
  signUp(data: Omit<User, "id">): Promise<User> {
    const user = authService.userRepository.create(data);
    return authService.userRepository.save(user);
  }
}
