import {Database} from "./backend/Database";
import {AuthService} from "./backend/Services/AuthService";

declare global {
  interface Window {
    db: Database;
    authService: AuthService;
  }
}

declare var window: Window;
