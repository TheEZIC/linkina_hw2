import {backend} from "./backend/backend";

declare global {
  interface Window {
    API: typeof backend,
  }
}

declare var window: Window;
