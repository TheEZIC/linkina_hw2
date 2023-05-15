import {userService} from "./UserService";

export const teacherService = {
  getAll() {
    return userService.getByRole("teacher");
  },
}
