import {database} from "./backend/Database";
import {authService} from "./backend/Services/AuthService";

type Test = typeof  database

declare global {
  interface Window {
    API: {
      db: typeof database;
      authService: typeof authService;
    }
  }
}

declare var window: Window;
