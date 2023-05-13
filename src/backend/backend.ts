import {database} from "./Database";
import {authService} from "./Services/AuthService";

export const backend = {
  db: database,
  authService,
};
