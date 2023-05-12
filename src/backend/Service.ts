import {Database} from "./Database";

export abstract class Service {
  constructor(
    protected readonly database: Database,
  ) {
  }
}
