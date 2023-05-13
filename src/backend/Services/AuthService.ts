import {database} from "../Database";
import {User} from "../entities/User.entity";
import {BaseUser} from "../types/BaseUser";

export const authService = {
  getUserRepository() {
    return database.getDataSource().getRepository(User);
  },
  async signIn(login: string, password: string): Promise<BaseUser | null> {
    const user = await authService.getUserRepository().findOne({
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

    if (!user) {
      return null;
    }

    delete user.credential;

    return user;
  },
  signUp(data: Omit<User, "id">): Promise<User> {
    const user = authService.getUserRepository().create(data);
    return authService.getUserRepository().save(user);
  }
}
