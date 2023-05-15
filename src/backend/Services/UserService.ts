import {repo} from "../Repo";
import {UserRole} from "../types";

export const userService = {
  getByRole(role: UserRole) {
    const repository = repo.getForUser();

    return repository.find({
      where: {
        role,
      },
      relations: {
        social: true,
        group: true,
      },
    });
  },
  async delete(userId: number) {
    const repository = repo.getForUser();
    await repository.delete(userId);
  },
};
