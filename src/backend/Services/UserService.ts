import {repo} from "../Repo";

export const userService = {
  async delete(userId: number) {
    const repository = repo.getForUser();
    await repository.delete(userId);
  },
};
