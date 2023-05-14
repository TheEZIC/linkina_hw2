import {User} from "../entities/User.entity";
import {UserCredential} from "../entities/UserCredential.entity";
import {BaseUser} from "../types/BaseUser";
import {repo} from "../Repo";

export const authService = {
  async signIn(login: string, password: string): Promise<BaseUser | null> {
    const repository = repo.getForUser();
    const user = await repository.findOne({
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
  async signUp(userData: Omit<User, "id" | "role" | "credential" | "social">, userCredentials: Omit<UserCredential, "id">, email: string): Promise<BaseUser> {
    const userRepository = repo.getForUser();
    const credentialRepository = repo.getForUserCredential();
    const socialRepository = repo.getForUserSocial();

    const user = userRepository.create({
      ...userData,
      role: "student",
    });

    const credential = await credentialRepository.create(userCredentials);
    const social = socialRepository.create({
      email,
    });

    const dbCredential = await credentialRepository.save(credential);
    const dbSocial = await socialRepository.save(social);

    user.credential = dbCredential;
    user.social = dbSocial;

    const dbUser = await userRepository.save(user);

    delete dbUser.credential;

    return dbUser;
  }
}
